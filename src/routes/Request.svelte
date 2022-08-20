<script lang="ts">
  import Input from "./Input.svelte";
  import axios, { type AxiosResponse } from "axios";
  import { headers, queryParams, rawResponse, timeTaken, jsonData } from "./stores";
  import TabButtons from "./TabButtons.svelte";
  import Tabs from "./Tabs.svelte";
import { npm_package_scripts_package } from "$env/static/private";

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
	// Add proxy to send request to URL, add Access-Control-Allow-Origin to send to us.
	// This also solves the issue of bad errors as api.allorigins.win handles those.
	let proxiedUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent(url);
	axios({
      url: proxiedUrl,
  	  method: method,
	  params: storeToObject($queryParams),
	  headers: storeToObject($headers),
	  data: $jsonData
	}).catch(e => e) // Handle 404
	  .then((res: AxiosResponse) => rawResponse.set(res));
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
