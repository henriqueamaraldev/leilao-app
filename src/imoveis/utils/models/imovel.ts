export interface imovel {
  link_do_imovel_no_site_da_caixa: string;
  endereco_do_imovel: string;
  bairro: string;
  descricao: string;
  preco_: number;
  valor_de_avaliacao_: number;
  desconto_: number;
  modalidade_de_venda: string;
  foto: string;
  cidade: string;
  estado: string;
}

export interface SearchOptions {
  options: {
    page: number;
    sort: 1 | -1;
    sortBy: string;
  };
  filter?: {
    region: string;
    city: string;
    description: string;
  };
}
