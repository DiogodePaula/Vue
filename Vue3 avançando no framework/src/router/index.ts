import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

import Tarefa from "@/views/Tarefa.vue";
import Projetos from "@/views/Projetos.vue";

const rotas: RouteRecordRaw[] = [
	{
		path: "/",
		name: "Tarefas",
		component: Tarefa,
	},
	{
		path: "/projetos",
		name: "Projetos",
		component: Projetos,
	},
];

const roteador = createRouter({
	history: createWebHashHistory(),
	routes: rotas,
});

export default roteador;
