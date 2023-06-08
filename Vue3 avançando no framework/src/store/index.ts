import { InjectionKey } from "vue";
import { Store, createStore } from "vuex";
// @ é um apelido para src
import IProjeto from "@/interfaces/IProjeto";

interface Estado {
	projetos: IProjeto[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
	// configuração do estado
	state: {
		projetos: [
			{
				id: new Date().toISOString(),
				nome: "Typescript",
			},
			{
				id: new Date().toISOString(),
				nome: "Vue",
			},
			{
				id: new Date().toISOString(),
				nome: "Vuex",
			},
		],
	},
});
