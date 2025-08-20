import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { deleteInvestimento, type Investimento, updateInvestimento } from "../routes/investimentos";
import { ConfirmModal } from "./ConfirmModal";

interface Props {
    investimentos: Investimento[];
    onUpdate?: () => void;
}

export const InvestimentosListar = ({ investimentos, onUpdate }: Props) => {
    const [editId, setEditId] = useState<number | null>(null);
    const [editNome, setEditNome] = useState("");
    const [editTipo, setEditTipo] = useState("");
    const [editValor, setEditValor] = useState<number | "">("");
    const [itemParaDeletar, setItemParaDeletar] = useState<Investimento | null>(null);

    const formatarDataCurta = (dataStr?: string) => {
        if (!dataStr) return "-";
        const data = new Date(dataStr);
        return data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit", timeZone: "UTC" });
    };

    const startEdit = (inv: Investimento) => {
        if (!inv.id) return;
        setEditId(inv.id);
        setEditNome(inv.nome_investimento);
        setEditTipo(inv.tipo_investimento);
        setEditValor(inv.valor);
    };

    const cancelEdit = () => {
        setEditId(null);
    };

    const handleUpdate = async () => {
        if (!editId) return;
        const result = await updateInvestimento(editId, {
            nome_investimento: editNome,
            tipo_investimento: editTipo,
            valor: Number(editValor),
        });
        if (result) {
            toast.success("Ativo atualizado!");
            cancelEdit();
            if (onUpdate) onUpdate();
        } else {
            toast.error("Erro ao atualizar.");
        }
    };

    const handleDelete = async () => {
        if (!itemParaDeletar || !itemParaDeletar.id) return;
        const success = await deleteInvestimento(itemParaDeletar.id);
        if (success) {
            toast.success("Ativo excluído!");
            if (onUpdate) onUpdate();
        } else {
            toast.error("Erro ao excluir.");
        }
        setItemParaDeletar(null);
    };

    const inputEditClasses = "w-full px-4 py-2 bg-white border-2 border-slate-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary";

    return (
        <div className="space-y-2">
            <div className="grid grid-cols-12 gap-4 px-4 pb-3 border-b border-slate-200 text-sm font-bold text-text-secondary uppercase">
                <div className="col-span-5">Nome</div>
                <div className="col-span-3">Tipo</div>
                <div className="col-span-2 text-right">Valor</div>
                <div className="col-span-2 text-right">Ações</div>
            </div>

            {investimentos.length > 0 ? (
                investimentos.map((inv) => (
                    <div key={inv.id}>
                        {editId === inv.id ? (
                            <div className="p-4 bg-blue-50 rounded-lg border-2 border-primary">
                                <div className="grid grid-cols-12 gap-3 items-center">
                                    <input value={editNome} onChange={(e) => setEditNome(e.target.value)} className={`${inputEditClasses} col-span-5`} />
                                    <input value={editTipo} onChange={(e) => setEditTipo(e.target.value)} className={`${inputEditClasses} col-span-3`} />
                                    <input
                                        type="number"
                                        value={editValor}
                                        onChange={(e) => setEditValor(e.target.value === "" ? "" : Number(e.target.value))}
                                        className={`${inputEditClasses} col-span-2 text-right`}
                                    />
                                    <div className="col-span-2 flex justify-end gap-2">
                                        <button onClick={handleUpdate} className="p-2 text-slate-500 rounded-full hover:bg-green-100 hover:text-green-600" title="Salvar">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                        <button onClick={cancelEdit} className="p-2 text-slate-500 rounded-full hover:bg-red-100 hover:text-red-600" title="Cancelar">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-12 gap-4 px-4 py-3 items-center even:bg-background rounded-lg transition-colors hover:bg-slate-100">
                                <div className="col-span-5">
                                    <p className="font-bold text-text-primary">{inv.nome_investimento}</p>
                                    <p className="text-sm text-text-secondary md:hidden">{formatarDataCurta(inv.data_investimento)}</p>
                                </div>
                                <div className="col-span-3 text-slate-600">{inv.tipo_investimento}</div>
                                <div className="col-span-2 text-right font-medium text-text-primary">{Number(inv.valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</div>
                                <div className="col-span-2 flex justify-end items-center gap-2">
                                    <span className="hidden md:inline text-sm text-text-secondary">{formatarDataCurta(inv.data_investimento)}</span>
                                    <button onClick={() => startEdit(inv)} className="p-2 text-slate-500 rounded-full hover:bg-blue-100 hover:text-primary" title="Editar">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <button onClick={() => setItemParaDeletar(inv)} className="p-2 text-slate-500 rounded-full hover:bg-red-100 hover:text-red-500" title="Excluir">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="text-center py-16">
                    <p className="text-text-secondary">Nenhum investimento cadastrado ainda.</p>
                </div>
            )}

            <ConfirmModal isOpen={itemParaDeletar !== null} investimento={itemParaDeletar} onConfirm={handleDelete} onCancel={() => setItemParaDeletar(null)} />
        </div>
    );
};
