import {
  useNumberInput,
  Button,
  Input,
  HStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { CartContext } from "../../context/Context";


export function HookUsage(props) {
  // const { quantity, setQuantity } = useContext(CartContext)
    const { quantity, setQuantity } = useContext(CartContext);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 1,
      max: 10,
      precision: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  // setQuantity(input.value)
  // console.log(quantity);
  // const value = input.value
  // console.log(input.value);
  // let onChange= props.changeValue(value)

  const handleSubmit = (e) => {
    e.preventDefault();
    // props.onSubmit(value)
    setQuantity(input.value)
    console.log("entrei aqui");
  }

  const handleClick = () => {
    setQuantity(input.value)
  }
  console.log(quantity);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <HStack maxW="320px">
          <Button {...inc}>
            +
          </Button>
          <Input {...input} />
          <Button {...dec}>
            -
          </Button>
        </HStack>
        <Button
          onClick={() => handleClick()}
          colorScheme="blue"
          variant="ghost"
        >
          Adicionar ao carrinho
        </Button>
      </form>
    </>
  );
}