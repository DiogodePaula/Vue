<template>
	<section>
		<strong class="display">{{ tempoDecorrido }}</strong>
	</section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "Cronometro-time",
	props: {
		tempoEmSegundos: {
			type: Number,
			default: 0,
		},
	},
	computed: {
		tempoDecorrido(): string {
			// new Date().toLocaleTimeString() Esse método já retorna o horário, localizado de acordo com o idioma do navegador.
			// passando o tempo em milissegundos para o construtor de data
			return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11, 8); // "00:00:00"
		},
	},
});
</script>

<style>
.display {
	color: var(--texto-primario);
}
</style>
