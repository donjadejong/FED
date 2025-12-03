// JavaScript Document
console.log("hi, mijn naam is Donja.");

// bron: https://webdesign.tutsplus.com/how-to-build-a-simple-carousel-with-vanilla-javascript--cms-41734t
// carrousel 
const list = document.querySelector('.carrousel ul');
const itemWidth = list.querySelector('li').offsetWidth + 20;

document.getElementById('next').onclick = () => list.scrollLeft += itemWidth * 2;
document.getElementById('last').onclick = () => list.scrollLeft -= itemWidth * 2;

