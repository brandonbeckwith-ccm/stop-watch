import StopWatch from "../custom-component/StopWatch.vue";
import WorldClock from "../custom-component/WorldClock.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";

import RefPanel from "../custom-component/RefPanel.vue";
import Calculator from "../pages/Calculator.vue";

 const routes = [
    {path:'/',name:'Home',component:Home},
    {path:'/clock',name:'Clock',children:[
        {path:'stopWatch',name:'Stop-Watch',component:StopWatch},
        {path:'worldClock',name:'World-Clock',component:WorldClock},
    ]},
    {path:'/customRef',name:'Custom-Ref',component:RefPanel},
    {path:'/calculator',name:'Calculator',component:Calculator},
]

export const router = createRouter({
    history:createWebHistory(),
    routes,
})

