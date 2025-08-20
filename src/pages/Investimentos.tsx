import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Header } from "../components/Header";
import { InvestimentoForm } from "../components/InvestimentoForm";
import { InvestimentosListar } from "../components/InvestimentoListar";
import { getAllInvestimentos, type Investimento } from "../routes/investimentos";

export const Investimentos = () => {
    const [investimentos, setInvestimentos] = useState<Investimento[]>([]);

    const fetchInvestimentos = async () => {
        const data = await getAllInvestimentos();
        if (data) {
            setInvestimentos(data);
        } else {
            toast.error("Erro ao carregar investimentos");
        }
    };

    useEffect(() => {
        fetchInvestimentos();
    }, []);

    return (
        <div className="bg-background min-h-screen">
            <Header />

            {/* Container principal que "flutua" sobre o header */}
            <main className="container mx-auto px-4 md:px-8 -mt-16">
                {/* Card do Formulário */}
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg mb-8">
                    <InvestimentoForm onSuccess={fetchInvestimentos} />
                </div>

                {/* Card da Lista */}
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-text-primary mb-6">Ativos em Carteira</h2>
                    <InvestimentosListar investimentos={investimentos} onUpdate={fetchInvestimentos} />
                </div>
            </main>
        </div>
    );
};
