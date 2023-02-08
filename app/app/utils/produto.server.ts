import { db } from "./db.server";

export const getProdutos = async () => {
  return db.produtoQI.findMany();
};

export const saveProdutos = async (produto: any) => {
  console.log(produto);
  const newProduto = await db.produtoQI.create({
    data: {
      codigo: produto.codigo,
      preco: parseFloat(produto.preco.replace(".", "").replace(",", ".")),
      descricao: produto.descricao,
      estoque: produto.estoque,
      embalagem: produto.embalagem,
    },
  });
  return { newProduto };
};
