/*
    Crea un programa que pida al usuario el valor del radio y muestre por pantalla:
    • El valor del radio.
    • El valor del diámetro.
    • El valor del perímetro de la circunferencia.
    • El valor del área del círculo.
    • El valor del área de la esfera.
    • El valor del volumen de la esfera.
    • El valor de Pi debes obtenerlo del objeto Math, no introducirlo manualmente.
    • Debes escribir al lado si son cm, o cm2
    , o cm3
    .
    • Como datos de muestra, si metes 5, deberías obtener aproximadamente: 5 / 10 / 31,41 
    / 78,54 / 314,15 / 523,59.

*/

const diameter = (rad) => rad * 2;

const perimeter = (rad) => Math.PI * rad;

const circle_area = (rad) => Math.PI * rad ** 2;

const sphere_area = (rad) => 4 * circle_area(rad);

const vol = (rad) => (4 / 3) * Math.PI * rad ** 3;

const circleOperations = () => {
  const rad = parseFloat(prompt("Digame el valor del radio"));

  const response = `El radio es: ${rad} cm\nEl diámetro es: ${diameter(
    rad
  )} cm\nEl Área del circulo es: ${circle_area(
    rad
  )} cm2\nEl Área de la esfera es: ${sphere_area(
    rad
  )} cm2\n El volumen es: ${vol(rad)} cm3\nEl valor de PI es: ${Math.PI}`;

  alert(response);
};

circleOperations();
