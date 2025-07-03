const itemRefs = document.querySelectorAll('.item');
const containerRef = document.querySelector('.container');

let isCircleTurn;

const startGame = () => {
  for (const item of itemRefs) {
    item.addEventListener('click', handleClick, { once: true });
  };

  isCircleTurn = false;

  containerRef.classList.add('x');
}

const placeMark = (item, classToAdd) => {
  item.classList.add(classToAdd);
}

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  containerRef.classList.remove('o');
  containerRef.classList.remove('x');

  if (isCircleTurn) {
    containerRef.classList.add('o');
  } else {
    containerRef.classList.add('x');
  }
}

const handleClick = (e) => {
  // Colocar o X ou O em cada item
  const item = e.target;
  const classToAdd = isCircleTurn ? 'o' : 'x';

  placeMark(item, classToAdd);


  // Verificar a cada clique se houve vitória
  // Verificar a cada clique se houve empate
  swapTurns();
}

startGame();
