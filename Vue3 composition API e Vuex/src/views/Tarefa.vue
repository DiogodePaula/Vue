<template>
	<div class="column is-three-quarter conteudo">
		<Formulario @aoSalvarTarefa="salvaTarefa" />
		<div class="lista">
			<Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @tarefaClicada="selecionarTarefa" />
			<div class="modal" :class="{ 'is-active': tarefaSelecionada }">
				<div class="modal-background"></div>
				<div class="modal-card">
					<header class="modal-card-head">
						<p class="modal-card-title">Modal title</p>
						<button class="delete" aria-label="close"></button>
					</header>
					<section class="modal-card-body">teste</section>
					<footer class="modal-card-foot">
						<button class="button is-success">Save changes</button>
						<button class="button">Cancel</button>
					</footer>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Formulario from "../components/Formulario.vue";
import { useStore } from "@/store";
import { CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from "@/store/tipo-acoes";
import Tarefa from "../components/Tarefa.vue";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
	name: "App",
	data() {
		return {
			tarefaSelecionada: null as ITarefa | null,
		};
	},
	methods: {
		salvaTarefa(tarefa: ITarefa): void {
			this.store.dispatch(CADASTRAR_TAREFA, tarefa);
		},
		selecionarTarefa(tarefa: ITarefa) {
			this.tarefaSelecionada = tarefa;
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
	setup() {
		const store = useStore();
		store.dispatch(OBTER_TAREFAS);
		store.dispatch(OBTER_PROJETOS);
		return {
			tarefas: computed(() => store.state.tarefas), // o vue fica de olha na lista quando ela mudar
			store,
		};
	},
});
</script>
