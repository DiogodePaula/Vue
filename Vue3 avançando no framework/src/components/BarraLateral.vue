<template>
	<header>
		<h1>
			<img src="../assets/logo.png" alt="Alura Tracker" />
		</h1>
		<div class="has-text-centered">
			<button class="button" @click="alterarTema">{{ textoBotao }}</button>
		</div>
		<nav class="panel mt-5">
			<ul>
				<li>
					<router-link to="/" class="link">
						<i class="fas fa-tasks"></i>
						tarefas
					</router-link>
				</li>
				<li>
					<router-link to="/projetos" class="link">
						<i class="fas fa-project-diagram"></i>
						projetos
					</router-link>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "BarraLateral",
	emits: ["aoTemaAlterado"],
	data() {
		return {
			modoEscuroAtivo: false,
		};
	},
	computed: {
		textoBotao() {
			if (this.modoEscuroAtivo) {
				return "Desativar modo escuro";
			}
			return "Ativar modo escuro";
		},
	},
	methods: {
		alterarTema() {
			this.modoEscuroAtivo = !this.modoEscuroAtivo; //quando clicado vai substituir plo oposto
			this.$emit("aoTemaAlterado", this.modoEscuroAtivo);
		},
	},
});
</script>

<style>
header {
	padding: 1rem;
	background: #0d3b66;
	width: 100%;
	height: 100vh;
	text-align: center;
}
@media only screen and (max-width: 768px) {
	header {
		padding: 2.5rem;
		height: auto;
	}
}
li {
	display: flex;
	align-items: center;
	justify-content: start;
}
.link {
	color: #fff !important;
}
link:hover {
	color: #faf0ca;
}
.link.router-link-active {
	color: #faf0ca;
}
</style>
