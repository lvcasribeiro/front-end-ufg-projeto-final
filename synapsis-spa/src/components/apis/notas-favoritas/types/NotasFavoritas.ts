export type NotasFavoritas = {
  id: number;
  criadoEm: string;
  usuario: {
    id: number;
    name: string;
    email: string;
    apelido: string;
    password: string;
    dataNascimento: string;
  };
  conteudo: {
    id: number;
    titulo: string;
    corpo: string;
    cor: string;
    status: "RASCUNHO" | "PUBLICADO";
    publicadoEm: string;
    categoria: {
      id: number;
      nome: string;
      descricao: string;
      criadoEm: string;
      criadoPor: {
        id: number;
        name: string;
        email: string;
        apelido: string;
        password: string;
        dataNascimento: string;
      };
    };
    tags: {
      id: number;
      nome: string;
      criadoEm: string;
      criadoPor: {
        id: number;
        name: string;
        email: string;
        apelido: string;
        password: string;
        dataNascimento: string;
      };
    }[];
  };
};
