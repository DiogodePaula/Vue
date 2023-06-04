<template>
	<main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
		<div class="column is-one-quarter">
			<BarraLateral @aoTemaAlterado="trocarTema" />
		</div>
		<div class="column is-three-quarter conteudo">
			<Formulario @aoSalvarTarefa="salvaTarefa" />
			<div class="lista">
				<Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
			</div>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import Formulario from "./components/Formulario.vue";
import Tarefa from "./components/Tarefa.vue";
import ITarefa from "./interfaces/ITarefa";

export default defineComponent({
	name: "App",
	data() {
		return {
			tarefas: [] as ITarefa[],
			modoEscuroAtivo: false,
		};
	},
	methods: {
		salvaTarefa(tarefa: ITarefa) {
			this.tarefas.push(tarefa);
		},
		trocarTema(modoEscuroAtivo: boolean) {
			this.modoEscuroAtivo = modoEscuroAtivo;
		},
	},
	components: {
		BarraLateral,
		Formulario,
		Tarefa,
	},
});
</script>

<style>
main {
	--bg-primario: #fff;
	--texto-primario: #000;
}
main.modo-escuro {
	--bg-primario: #2b2d42;
	--texto-primario: #ddd;
}
.conteudo {
	background-color: var(--bg-primario);
}
.lista {
	padding: 1.25rem;
}
</style>
