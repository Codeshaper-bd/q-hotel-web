<template>
<dialog ref="dlg" class="modal" aria-labelledby="reserve-title" @click="onBackdrop" @close="emit('update:open',false)">
<div class="relative max-h-[92dvh] overflow-y-auto bg-paper p-6 text-ink sm:p-10">
<button ref="closeRef" class="absolute right-4 top-4 h-10 w-10 border border-line text-xl" type="button" aria-label="Close reservation dialog" @click="close">x</button>
<form v-if="!sent" @submit.prevent="submit">
<BaseKicker>Reserve Your Table</BaseKicker><h2 id="reserve-title" class="mt-5 font-display text-3xl">Reserve Table At {{restaurant}}</h2>
<div class="mt-8 grid gap-5 sm:grid-cols-2">
<label>Date<input v-model="form.date" :min="today" :class="field" type="date" required></label>
<label>Time<input v-model="form.time" :class="field" type="time" required></label>
<label class="sm:col-span-2">Number of guests<input v-model.number="form.guests" :class="field" type="number" min="1" max="20" required></label>
<label>Name<input v-model.trim="form.name" :class="field" autocomplete="name" required></label>
<label>Phone number<input v-model.trim="form.phone" :class="field" type="tel" autocomplete="tel" required></label>
<label class="sm:col-span-2">Email address<input v-model.trim="form.email" :class="field" type="email" autocomplete="email" required></label>
<label class="sm:col-span-2">Special request (optional)<textarea v-model.trim="form.request" :class="[field,'h-auto py-3']" rows="4"/></label>
</div><p class="mt-5 text-xs text-muted">Your reservation is not confirmed until our team contacts you.</p>
<div class="mt-6 flex gap-3"><BaseButton type="submit" variant="gold">Book a Table</BaseButton><BaseButton type="button" variant="outline" @click="close">Go Back</BaseButton></div>
</form>
<section v-else class="mx-auto max-w-xl py-10 text-center" aria-live="polite">
<div class="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green-700 text-2xl text-white">&#10003;</div>
<h2 id="reserve-title" class="mt-6 font-display text-4xl">Reservation Submitted</h2><p class="mt-3 text-green-700">Thank you</p><p class="mt-5 text-sm text-muted">Our team will contact you shortly to confirm your booking.</p>
<dl class="mt-8 bg-champagne/15 p-5 text-sm"><div v-for="x in details" :key="x[0]" class="flex justify-between border-b border-line py-3 last:border-0"><dt>{{x[0]}}</dt><dd>{{x[1]}}</dd></div></dl>
<p class="mt-5 bg-green-700/10 p-4 text-left text-xs text-green-800">This is a reservation request only. Please wait for confirmation from our team.</p><BaseButton type="button" variant="primary" class="mt-6 w-full" @click="close">Close</BaseButton>
</section></div></dialog>
</template>
<script setup lang="ts">
import type Lenis from 'lenis'
const props=defineProps<{open:boolean;restaurant:string;image:string}>(),emit=defineEmits<{'update:open':[boolean]}>()
const dlg=ref<HTMLDialogElement|null>(null),closeRef=ref<HTMLButtonElement|null>(null),sent=ref(false),refId=ref('')
const form=reactive({date:'',time:'',guests:2,name:'',phone:'',email:'',request:''}),today=new Date().toISOString().slice(0,10)
const field='mt-2 h-12 w-full border border-ink/30 bg-transparent px-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ocean'
const details=computed(()=>[['Date',form.date],['Time',form.time],['Guests',String(form.guests)],['Restaurant',props.restaurant],['Reference ID',refId.value]])
const lenis=useNuxtApp().$lenis as Lenis|undefined
function submit(){refId.value='QHD-'+form.date.replaceAll('-','')+'-'+Math.floor(1000+Math.random()*9000);sent.value=true}
function close(){emit('update:open',false)}function onBackdrop(e:MouseEvent){if(e.target===dlg.value)close()}
function freeze(v:boolean){v?lenis?.stop():lenis?.start();document.documentElement.classList.toggle('overflow-hidden',v)}
watch(()=>props.open,async v=>{if(!dlg.value)return;if(v){dlg.value.showModal();freeze(true);await nextTick();closeRef.value?.focus()}else{if(dlg.value.open)dlg.value.close();freeze(false);sent.value=false}})
onBeforeUnmount(()=>freeze(false))
</script>
<style scoped>.modal{background:transparent;border:0;max-height:94dvh;max-width:min(50rem,94vw);padding:0;width:94vw}.modal::backdrop{background:rgb(var(--color-night)/.72)}</style>
