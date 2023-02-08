import { z } from "zod";
import { makeDomainFunction } from "domain-functions";
import type { ActionFunction } from "@remix-run/node";
import { createForm } from "remix-forms";
import {
  Form as FrameworkForm,
  useActionData,
  useSubmit,
  useTransition as useNavigation,
} from "@remix-run/react";
import { formAction } from "~/app/utils/form-action.server"; /* path to your custom formAction */
import { saveProdutos } from "~/app/utils/produto.server";
const Form = createForm({
  component: FrameworkForm,
  useNavigation,
  useSubmit,
  useActionData,
});

const schema = z.object({
  codigo: z.string().min(1, { message: "Não pode ser vazio" }),
  descricao: z.string().min(10, { message: "Mínimo 10 caracteres" }),
  embalagem: z.enum(["PC", "KG", "PCT"]),
  preco: z.string().min(2, { message: "Entre um preço Válido" }),
  //preco: z.number().positive({ message: "Entre um preço Válido" }),
  estoque: z.number().positive({ message: "Entre uma quantidade válida" }),
});
const mutation = makeDomainFunction(schema)(async (values) => {
  saveProdutos(values);
  console.log(values);
});
export const action: ActionFunction = async ({ request }) =>
  formAction({
    request,
    schema,
    mutation,

    successPath: "/produtos",
  });
export default function Novo() {
  return (
    <>
      <div className="mt-10 py-3 sm:mt-0">
        <div className="md:grid md:grid-cols-4 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Cadastro de Produtos
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Dados principais do produto a ser cadastrado
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-3 md:mt-0">
            <Form
              schema={schema}
              placeholders={{ embalagem: "Selecione o tipo" }}
            >
              {({ Field, Errors, Button, register }) => (
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <Field name="codigo" label="Código">
                          {({ Label, Errors }) => (
                            <>
                              <Label className="block text-sm font-medium text-gray-700" />
                              <input
                                type="string"
                                {...register("codigo")}
                                className="mt-1 block border w-full rounded-md border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                              <Errors className=" text-red-500 font-extralight font-mono" />
                            </>
                          )}
                        </Field>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <Field name="preco" label="Preço">
                          {({ Label, Errors }) => (
                            <>
                              <Label className="block text-sm font-medium text-gray-700" />
                              <input
                                type="string"
                                {...register("preco")}
                                className="mt-1 block border w-full rounded-md border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                              <Errors className=" text-red-500 font-extralight font-mono" />
                            </>
                          )}
                        </Field>
                      </div>
                      <div className="col-span-6 sm:col-span-6">
                        <Field name="descricao" label="Descrição">
                          {({ Label, Errors }) => (
                            <>
                              <Label className="block text-sm font-medium text-gray-700" />
                              <input
                                type="string"
                                {...register("descricao")}
                                className="mt-1 block border w-full rounded-md border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                              <Errors className=" text-red-500 font-extralight font-mono" />
                            </>
                          )}
                        </Field>
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <Field name="estoque" label="Estoque">
                          {({ Label, Errors }) => (
                            <>
                              <Label className="block text-sm font-medium text-gray-700" />
                              <input
                                type="number"
                                {...register("estoque")}
                                className="mt-1 block border w-full rounded-md border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                              <Errors className=" text-red-500 font-extralight font-mono" />
                            </>
                          )}
                        </Field>
                        <Errors />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <Field name="embalagem" label="Embalagem">
                          {({ Label, Errors }) => (
                            <>
                              <Label className="block text-sm font-medium text-gray-700" />
                              <select
                                // type="select"

                                {...register("embalagem")}
                                className="mt-1 block border w-full rounded-md border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />

                              <Errors className=" text-red-500 font-extralight font-mono" />
                            </>
                          )}
                        </Field>
                        <Errors />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 px-4 py-3 text-right sm:px-6">
                    <Button className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" />
                  </div>
                </div>
              )}
            </Form>
          </div>
        </div>
      </div>
    </>
    // <div>
    //   <div className="mt-5 md:col-span-3 md:mt-0">
    //     <Form schema={schema}>
    //       {({ Field, Errors, Button, register }) => (
    //         <>
    //           <div className="overflow-hidden shadow sm:rounded-md"></div>

    //           <Field name="codigo" label="Código">
    //             {({ Label, Errors }) => (
    //               <>
    //                 <Label className="block text-sm font-medium text-gray-700" />
    //                 <input
    //                   type="string"
    //                   {...register("codigo")}
    //                   className="border-2 p-1 border-gray-300 shadow rounded-lg "
    //                 />
    //                 <Errors className=" text-red-500 font-extralight font-mono" />
    //               </>
    //             )}
    //           </Field>
    //           <Field name="descricao" label="Descrição">
    //             {({ Label, Errors }) => (
    //               <>
    //                 <Label className="block text-sm font-medium text-gray-700" />
    //                 <input
    //                   type="string"
    //                   {...register("descricao")}
    //                   className="border-2 p-1 border-gray-300 shadow rounded-lg "
    //                 />
    //                 <Errors className=" text-red-500 font-extralight font-mono" />
    //               </>
    //             )}
    //           </Field>
    //           <Field name="preco" label="Preço">
    //             {({ Label, Errors }) => (
    //               <>
    //                 <Label className="block text-sm font-medium text-gray-700" />
    //                 <input
    //                   type="float"
    //                   {...register("preco")}
    //                   className="border-2 p-1 border-gray-300 shadow rounded-lg "
    //                 />
    //                 <Errors className=" text-red-500 font-extralight font-mono" />
    //               </>
    //             )}
    //           </Field>
    //           <Field name="quantidade" label="Quantidade">
    //             {({ Label, Errors }) => (
    //               <>
    //                 <Label className="block text-sm font-medium text-gray-700" />
    //                 <input
    //                   type="number"
    //                   {...register("quantidade")}
    //                   className="border-2 p-1 border-gray-300 shadow rounded-lg "
    //                 />
    //                 <Errors className=" text-red-500 font-extralight font-mono" />
    //               </>
    //             )}
    //           </Field>
    //           <Errors />
    //           <Button />
    //         </>
    //       )}
    //     </Form>
    //   </div>
    // </div>
  );
}
