<template>
	<div class="box formulario">
		<div class="columns">
			<div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa ">
				<input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao" />
			</div>
			<div class="column is-3">
				<div class="select">
					<select v-model="idProjeto">
						<option value="">Selecione o projeto</option>
						<option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
							{{ projeto.nome }}
						</option>
					</select>
				</div>
			</div>
			<div class="column">
				<Temporizador @ao-temporizador-finalizado="finalizarTarefa" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

import Temporizador from "./Temporizador.vue";
import { key } from "@/store";

export default defineComponent({
	name: "Formulario-time",
	components: { Temporizador },
	emits: ["aoSalvarTarefa"],
	data() {
		return {
			descricao: "",
			idProjeto: "",
		};
	},
	methods: {
		finalizarTarefa(tempoDecorrido: number): void {
			this.$emit("aoSalvarTarefa", {
				duracaoEmSegundos: tempoDecorrido,
				descricao: this.descricao,
				// this.projetos é o que foi programado no setup()
				projetos: this.projetos.find((proj) => proj.id == this.idProjeto),
			});
			this.descricao = "";
		},
	},
	setup() {
		const store = useStore(key);
		// tudo que é retornado aqui fica disponível no componente
		return {
			projetos: computed(() => store.state.projetos),
		};
	},
});
</script>

<style>
.formulario {
	color: var(--texto-primario);
	background-color: var(--bg-primario);
}
</style>
