import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { createInvestimento, type Investimento } from "../routes/investimentos";
// Importe o objeto e o tipo do nosso novo arquivo
import { TiposDeInvestimento, type TipoInvestimento } from "../types/types";

interface Props {
    onSuccess?: () => void;
}

type NovoInvestimentoData = Omit<Investimento, "id" | "data_investmento">;

export const InvestimentoForm = ({ onSuccess }: Props) => {
    const [nome, setNome] = useState("");
    // O estado agora pode usar o tipo para mais segurança
    const [tipo, setTipo] = useState<TipoInvestimento | "">("");
    const [valor, setValor] = useState<number | "">("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nome.trim() || !tipo || valor === "") {
            toast.error("Preencha todos os campos.");
            return;
        }

        const novoInvestimento: NovoInvestimentoData = {
            nome_investimento: nome,
            tipo_investimento: tipo,
            valor: Number(valor),
        };

        const result = await createInvestimento(novoInvestimento);
        if (result) {
            toast.success("Investimento criado!");
            setNome("");
            setTipo("");
            setValor("");
            if (onSuccess) onSuccess();
        } else {
            toast.error("Erro ao criar investimento.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <input
                type="text"
                placeholder="Nome do Ativo (ex: Tesouro Selic 2029)"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="md:col-span-2 w-full px-4 py-3 bg-background border-2 border-slate-200 rounded-lg text-text-primary placeholder-text-secondary
                           transition-colors duration-200
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />

            <select
                value={tipo}
                // O evento onChange precisa de uma conversão de tipo
                onChange={(e) => setTipo(e.target.value as TipoInvestimento)}
                className="w-full px-4 py-3 bg-background border-2 border-slate-200 rounded-lg text-text-primary placeholder-text-secondary
                           transition-colors duration-200
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
                <option value="" disabled>
                    Selecione o tipo
                </option>
                {/* Usamos Object.values() para iterar sobre os valores do nosso objeto */}
                {Object.values(TiposDeInvestimento).map((tipoOption) => (
                    <option key={tipoOption} value={tipoOption}>
                        {tipoOption}
                    </option>
                ))}
            </select>

            <input
                type="number"
                placeholder="Valor investido"
                value={valor}
                onChange={(e) => setValor(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full px-4 py-3 bg-background border-2 border-slate-200 rounded-lg text-text-primary placeholder-text-secondary
                           transition-colors duration-200
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-accent text-white font-bold rounded-lg shadow-md
                           hover:opacity-90 transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Adicionar
            </button>
        </form>
    );
};
