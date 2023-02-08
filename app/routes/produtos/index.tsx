import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getProdutos } from "~/app/utils/produto.server";

export const loader: LoaderFunction = async ({ request }) => {
  const produtos = await getProdutos();
  // return json({ produtos });
  return { produtos };
};

export default function Produtos() {
  const { produtos } = useLoaderData();
  // console.log(produtos);
  return <div> Produtos</div>;
}
