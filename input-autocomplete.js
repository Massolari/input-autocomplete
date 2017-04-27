Vue.component('input-autocomplete', {
	template: `
	<div :class="checkGroupClass">
		<div v-if="label && label.length > 0" :class="labelclass">{{ label }}</div>
		<input
		:required="required"
		v-on:input="updateValue"
		autocomplete="off"
		:placeholder="placeholder"
		type="text"
		:maxlength="maxlength"
		list="itens"
		:name="name"
		:id="id"
		:pattern="pattern"
		:class="checkClass"
		v-model="item"
		v-on:blur="$emit('blur', true)"
		v-on:click="$emit('click')"
		/>
		<datalist id="itens">
			<option v-for="c in list" :data-value="c[id]" :value="c[desc]" />
		</datalist>
	</div>
	`,
	props: [
	'placeholder',
	'required',
	'name',
	'id',
	'classname',
	'value',
	'maxlength',
	'list',
	'id',
	'desc',
	'errorclass',
	'pattern',
	'label',
	'labelclass',
	'groupclass',
	'grouperror'
	],
	data() {
		return {
			item: this.value,
			itemId: '',
			error: false
		}
	},
	methods: {
		updateValue() {
			let value = '';
			let selected = this.list.filter(item => {
				return item[this.desc] == this.item;
			});
			if (selected.length === 1) {
				value = selected[0][this.id];
			}
			this.itemId = value;
			this.error = (this.itemId === '');
			this.$emit('error', this.error);
			this.$emit('value', value);
			this.$emit('text', this.item);
		},
		reset() {
			this.item = "";
			this.itemId = "";
			this.error = false;
		}
	},
	computed: {
		checkClass() {
			return (this.error) ? `${this.classname} ${this.errorclass}` : this.classname;
		},
		checkGroupClass() {
			return (this.error) ? `${this.groupclass} ${this.grouperror}` : this.groupclass;
		}
	}
});