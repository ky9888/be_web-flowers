async function fetchData() {
  try {
    let response = await fetch("https://be-web-flowers.onrender.com/api/products/getAllProducts");
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
console.log("abc");


fetchData();