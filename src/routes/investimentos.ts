export interface Investimento {
    id?: number;
    nome_investimento: string;
    tipo_investimento: string;
    valor: number;
    data_investimento?: string;
}

export const createInvestimento = async (investimento: Omit<Investimento, "data_investimento">) => {
    try {
        const res = await fetch("http://localhost:3000/investimentos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(investimento),
        });
        if (!res.ok) throw new Error("Erro ao criar investimento");
        return await res.json();
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const getAllInvestimentos = async () => {
    try {
        const res = await fetch("http://localhost:3000/investimentos");
        if (!res.ok) throw new Error("Erro ao listar os investimentos");
        return (await res.json()) as Investimento[];
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const updateInvestimento = async (id: number, updated: Partial<Investimento>) => {
    try {
        const res = await fetch(`http://localhost:3000/investimentos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
        });
        if (!res.ok) throw new Error("Erro ao atualizar investimento");
        return await res.json();
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const deleteInvestimento = async (id: number) => {
    try {
        const res = await fetch(`http://localhost:3000/investimentos/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Erro ao deletar investimento");
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};
