export const TiposDeInvestimento = {
    RENDA_FIXA: "Renda Fixa",
    RENDA_VARIAVEL: "Renda Variável",
    FUNDOS_IMOBILIARIOS: "Fundos Imobiliários",
    TESOURO_DIRETO: "Tesouro Direto",
} as const;

export type TipoInvestimento = (typeof TiposDeInvestimento)[keyof typeof TiposDeInvestimento];
