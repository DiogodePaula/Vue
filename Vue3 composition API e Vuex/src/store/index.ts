import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
// @ é um apelido para src
import IProjeto from "@/interfaces/IProjeto";
import { INotificacoes } from "@/interfaces/INotificacoes";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, DEFINIR_PROJETO, DEFINIR_TAREFAS, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO } from "./tipo-acoes";
import api from "@/api";
import ITarefa from "@/interfaces/ITarefa";

interface Estado {
	projetos: IProjeto[];
	tarefas: ITarefa[];
	notificacoes: INotificacoes[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
	// configuração do estado
	state: {
		tarefas: [],
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
		[DEFINIR_PROJETO](state, projetos: IProjeto[]) {
			state.projetos = projetos;
		},
		[NOTIFICAR](state, novaNotificacao: INotificacoes) {
			novaNotificacao.id = new Date().getTime();
			state.notificacoes.push(novaNotificacao);

			setTimeout(() => {
				// remove a notificação depois de 3 segundos
				state.notificacoes = state.notificacoes.filter((notificacao) => notificacao.id != novaNotificacao.id);
			}, 3000);
		},
		// TAREFAS
		[DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
			state.tarefas = tarefas;
		},
		[ADICIONA_TAREFA](state, tarefa: ITarefa) {
			state.tarefas.push(tarefa);
		},
	},
	// para lidar com requisições assíncronas no vuex
	actions: {
		[OBTER_PROJETOS]({ commit }) {
			api.get("projetos").then((res) => commit(DEFINIR_PROJETO, res.data));
		},
		[CADASTRAR_PROJETO](ctx, nomeDoProjeto: string) {
			return api.post("projetos", {
				nome: nomeDoProjeto,
			});
		},
		[ALTERAR_PROJETO](ctx, projeto: IProjeto) {
			return api.put(`projetos/${projeto.id}`, projeto);
		},
		[REMOVER_PROJETO](ctx, id: string) {
			// deleta e atualiza o estado local para remover um item da lista
			return api.delete(`projetos/${id}`).then(() => this.commit(EXCLUIR_PROJETO, id));
		},
		// TAREFAS
		[OBTER_TAREFAS]({ commit }) {
			api.get("tarefas").then((res) => commit(DEFINIR_TAREFAS, res.data));
		},
		[CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
			return api.post("tarefas", tarefa).then((res) => commit(ADICIONA_TAREFA, res.data));
		},
	},
});

export function useStore(): Store<Estado> {
	return vuexUseStore(key);
}
