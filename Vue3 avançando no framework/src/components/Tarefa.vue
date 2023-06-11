<template>
	<div class="box has-text-weight-bold">
		<div class="columns">
			<div class="column is-7">{{ tarefa.descricao || "Tarefa sem descrição" }}</div>
			<div class="column is-3">{{ tarefa.projeto?.nome || "N/D" }}</div>
			<div class="column">
				<Cronometro :tempo-em-segundos="tarefa.duracaoEmSegundos" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Cronometro from "./Cronometro.vue";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
	name: "Tarefa-time",
	props: {
		tarefa: {
			type: Object as PropType<ITarefa>,
			required: true,
		},
	},
	data() {
		return {
			numb: 15,
		};
	},
	components: {
		Cronometro,
	},
});
</script>

<!-- só vai se aplicar a ele e seu filhos -->
<style scoped>
.box {
	background: #faf0ca;
}
</style>
