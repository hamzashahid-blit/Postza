<script lang="ts">
  import Input from "./Input.svelte";
  import axios, { type AxiosResponse } from "axios";
  import { headers, queryParams, rawResponse, timeTaken, jsonData } from "./stores";
  import TabButtons from "./TabButtons.svelte";
  import Tabs from "./Tabs.svelte";

  let method: string, url: string;
  let startTime: number;

  function storeToObject(storeArray: { key: string, value: string }[]){
    let result: {[key: string]: string} = {};
	storeArray.forEach(({key, value}) => {
	  if(key.length > 0) result[key] = value;
	})
	return result;
  }

  function send(_: CustomEvent) {
	axios({
      url: url,
  	  method: method,
	  params: storeToObject($queryParams),
	  headers: storeToObject($headers),
	  data: $jsonData
	}).catch(e => e) // Handle 404
	  .then((response: AxiosResponse) => rawResponse.set(response));
  }

  axios.interceptors.request.use(
	request => {startTime = Date.now(); return request}
	, _ => startTime = Date.now()
  )
  axios.interceptors.response.use(
	response => {timeTaken.set(Date.now() - startTime); return response}
	, error  => {timeTaken.set(Date.now() - startTime); return error.response}
  )
</script>

<Input bind:method bind:url on:send={send}/>
<div class="flex flex-col justify-center items-center">
  <TabButtons />
  <Tabs />
</div>
