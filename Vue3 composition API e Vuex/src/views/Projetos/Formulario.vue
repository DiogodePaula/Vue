<template>
	<section>
		<form @submit.prevent="salvar">
			<div class="field">
				<label for="nomeDoProjeto" class="label">Nome do Projeto</label>
				<input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto" />
			</div>
			<div class="field">
				<button class="button" type="submit">Salvar</button>
			</div>
		</form>
	</section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacoes";
// import { notificacaoMixin } from "@/mixins/notificar";
import useNotificador from "@/hooks/notificador";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipo-acoes";

export default defineComponent({
	name: "Projetos-vue",
	props: {
		id: {
			type: String,
		},
	},
	// mixins: [notificacaoMixin],
	mounted() {
		if (this.id) {
			const projeto = this.store.state.projetos.find((proj) => proj.id == this.id);
			this.nomeDoProjeto = projeto?.nome || "";
		}
	},
	data() {
		// data é o estado do nosso componente
		return {
			nomeDoProjeto: "",
		};
	},
	methods: {
		salvar() {
			if (this.id) {
				this.store
					.dispatch(ALTERAR_PROJETO, {
						id: this.id,
						nome: this.nomeDoProjeto,
					})
					.then(() => this.success());
			} else {
				// commit chama o mutation
				this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto).then(() => this.success());
			}
		},
		success() {
			this.nomeDoProjeto = "";
			this.notificar(TipoNotificacao.SUCESSO, "Excelente!", "O projeto foi cadastrado com sucesso!");
			// router fica disponível em qualquer componente
			this.$router.push("/projetos");
		},
	},
	setup() {
		const store = useStore();
		const { notificar } = useNotificador();

		return {
			store,
			notificar,
		};
	},
});
</script>
