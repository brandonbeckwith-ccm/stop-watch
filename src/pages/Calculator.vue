<script setup lang="ts">
import { useCalculator } from "../helpers/calculator";

const { screen, addNum, addOp, clear, cross, getSolution, history ,handleSolution} =
  useCalculator();
</script>

<template>
  <div class="pannel-wrapper">
    <div class="calc">
      <div class="screen">{{ screen }}</div>
      <div class="btn equa" @click="addOp('(')">(</div>
      <div class="btn equa" @click="addOp(')')">)</div>
      <div class="btn clear" @click="clear">C</div>
      <div class="btn cross" @click="cross">X</div>

      <div class="btn num" @click="addNum('1')">1</div>
      <div class="btn num" @click="addNum('2')">2</div>
      <div class="btn num" @click="addNum('3')">3</div>
      <div class="btn" @click="addOp('*')">*</div>

      <div class="btn num" @click="addNum('4')">4</div>
      <div class="btn num" @click="addNum('5')">5</div>
      <div class="btn num" @click="addNum('6')">6</div>
      <div class="btn" @click="addOp('-')">-</div>

      <div class="btn num" @click="addNum('7')">7</div>
      <div class="btn num" @click="addNum('8')">8</div>
      <div class="btn num" @click="addNum('9')">9</div>
      <div class="btn" @click="addOp('+')">+</div>

      <div class="btn num" @click="addNum('0')">0</div>
      <div class="btn" @click="addNum('.')">.</div>
      <div class="btn" @click="addOp('/')">/</div>
      <div class="btn equal" @click="getSolution">=</div>
    </div>
    <div class="history-pannel">
      <div>
        <h1>History</h1>
        <hr />
        <div class="history-list" v-for="(item, index) in history" :key="index" @click="handleSolution(item)">{{ item }}</div>
        
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pannel-wrapper {
  display: flex;
  gap: 50px;
}
.history-pannel {
  text-align: center;
  border: 2px solid black;
  width: 300px;
  margin: 40px auto;
  border-radius: 10px;
  padding: 15px;
  background: #f5f5f5;
  align-items: center;
  padding: 15px;
}

.history-list {
  text-align: left;
  cursor: pointer;
  font-size: 18px;
  padding: 8px 4px; 
  margin-bottom: 5px; 
  border-bottom: 1px solid #ddd; 
  transition: background 0.2s ease;
}

.history-list:hover {
  background: #e6e6e6; 
  border-radius: 4px;
}


.calc{
  border: 2px solid black;
  width: 300px;
  margin: 40px auto;
  border-radius: 10px;
  padding: 15px;
  background: #f5f5f5;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}

h1 {
  color: #959595;
  margin: 0;
  padding: 0;
}
.screen {
  grid-column: span 4;
  background-color: #222;
  color: greenyellow;
  text-align: right;
  font-size: 30px;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  color: black;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
}

.btn:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
}

.btn.clear {
  background-color: #ffb3b3;
}
.btn.equal {
  background-color: #b3c6ff;
}
.btn.cross {
  background-color: #ffd699;
}
.equa {
  background-color: #e0e0e0;
}
</style>
