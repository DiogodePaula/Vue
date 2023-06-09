import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

import Tarefa from "@/views/Tarefa.vue";
import Projetos from "@/views/Projetos.vue";
import Formulario from "@/views/Projetos/Formulario.vue";
import Lista from "@/views/Projetos/Lista.vue";

const rotas: RouteRecordRaw[] = [
	{
		path: "/",
		name: "Tarefas",
		component: Tarefa,
	},
	{
		path: "/projetos",
		component: Projetos,
		children: [
			{
				path: "",
				name: "Projetos",
				component: Lista,
			},
			{
				path: "novo",
				name: "Novo projetos",
				component: Formulario,
			},
			{
				path: ":id",
				name: "Editar projetos",
				component: Formulario,
				props: true, // vai injetar o parâmetro da url como uma propriedade no componente
			},
		],
	},
];

const roteador = createRouter({
	history: createWebHashHistory(),
	routes: rotas,
});

export default roteador;
