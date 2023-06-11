import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
// @ é um apelido para src
import IProjeto from "@/interfaces/IProjeto";
import { INotificacoes } from "@/interfaces/INotificacoes";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes";

interface Estado {
	projetos: IProjeto[];
	notificacoes: INotificacoes[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
	// configuração do estado
	state: {
		projetos: [],
		notificacoes: [],
	},
	mutations: {
		[ADICIONA_PROJETO](state, nomeDoProjeto: string) {
			const projeto = {
				id: new Date().toISOString(),
				nome: nomeDoProjeto,
			} as IProjeto;

			state.projetos.push(projeto);
		},
		[ALTERA_PROJETO](state, projeto: IProjeto) {
			const index = state.projetos.findIndex((proj) => proj.id == projeto.id);
			state.projetos[index] = projeto;
		},
		[EXCLUIR_PROJETO](state, id: string) {
			state.projetos = state.projetos.filter((proj) => proj.id != id);
		},
		[NOTIFICAR](state, novaNotificacao: INotificacoes) {
			novaNotificacao.id = new Date().getTime();
			state.notificacoes.push(novaNotificacao);

			setTimeout(() => {
				// remove a notificação depois de 3 segundos
				state.notificacoes = state.notificacoes.filter((notificacao) => notificacao.id != novaNotificacao.id);
			}, 3000);
		},
	},
});

export function useStore(): Store<Estado> {
	return vuexUseStore(key);
}
