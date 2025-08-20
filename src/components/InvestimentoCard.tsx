import type { Investimento } from "../routes/investimentos";

export const InvestimentoCard = ({ investimento }: { investimento: Investimento }) => {
    return (
        <div className="border p-4 rounded-md shadow-md flex flex-col gap-1">
            <h3 className="font-bold text-lg">{investimento.nome_investimento}</h3>
            <p className="text-gray-700">Tipo: {investimento.tipo_investimento}</p>
            <p className="text-gray-700">Valor: R$ {investimento.valor}</p>
            <p className="text-gray-500 text-sm">Data: {investimento.data_investimento}</p>
        </div>
    );
};
