<template>
	<div class="column is-three-quarter conteudo">
		<Formulario @aoSalvarTarefa="salvaTarefa" />
		<div class="lista">
			<Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "../components/BarraLateral.vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import ITarefa from "../interfaces/ITarefa";

export default defineComponent({
	name: "App",
	data() {
		return {
			tarefas: [] as ITarefa[],
		};
	},
	methods: {
		salvaTarefa(tarefa: ITarefa) {
			this.tarefas.push(tarefa);
		},
	},
	components: {
		Formulario,
		Tarefa,
	},
	computed: {
		semTarefa(): boolean {
			return this.tarefas.length == 0;
		},
	},
});
</script>
