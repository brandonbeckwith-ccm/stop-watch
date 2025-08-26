import { ref } from "vue";
export const useCalculator = () => {

    let screen = ref("0");
    let history = ref<string[]>([]);
    const addNum = (num: string) => {
        screen.value === "0" ? (screen.value = num) : (screen.value += num);
    };
    const addOp = (op: string) => {
        if (screen.value === "0" || screen.value === ".") {
            if (op == "-") {
                screen.value = op;
            } else {
                return;
            }
        }
        screen.value += op;
    };
    const clear = () => {
        screen.value = "0";
    };
    const cross = () => {
        screen.value =
            screen.value === "0" ? (screen.value = "0") : screen.value.slice(0, -1);
    };
    const getSolution = () => {
        try {
            const result = eval(screen.value); 
            history.value.unshift(`${screen.value} = ${result}`);
            screen.value = result.toString();
        } catch {
            screen.value = "Error";
        }
    };
    const handleSolution=(exp:string)=>{
        console.log('exp',exp.split('=')[0]);
        screen.value = eval(exp.split('=')[0])
    }

    return { screen, addNum, addOp, clear, cross, getSolution,history,handleSolution}
} 