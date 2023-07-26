


// Internamente, customStyles combinará profundamente tus estilos personalizados con los estilos predeterminados.
const customStyles = {
  rows: {
    style: {
      minHeight: '40px', // anula la altura predeterminada de las filas
    },
  },
  headCells: {
    style: {
      // Agregamos un espacio de 8px en los lados izquierdo y derecho del componente
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      // Establecemos el color de fondo del componente como un tono gris claro (#f1f1f1)
      backgroundColor: '#f6f9fc',
      // Establecemos el color del texto dentro del componente como un tono oscuro de gris (#333)
      color: '#8898aa',
      // Utilizamos flexbox para organizar los elementos secundarios dentro del componente
      display: 'flex',
      // Centramos los elementos secundarios horizontalmente en el componente
      justifyContent: 'center',
      // Centramos los elementos secundarios verticalmente en el componente
      alignItems: 'center',
      // Aplicamos un estilo de fuente en negrita al texto dentro del componente
      fontWeight: 'bold',
    },
  },
  cells: {
    style: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
      backgroundColor: 'transparent',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#525f7f',
    },
  },
};

const customTheme = {
  text: {
    primary: '#333',
    secondary: '#555',
  },
  background: {
    default: '#F9F9F9',
  },
  context: {
    background: '#E5F4FF',
    text: '#268bd2',
  },
  divider: {
    default: '#ccc',
  },
  action: {
    button: '#333',
    hover: '#f1f1f1',
    disabled: '#f3f3f3',
  },
};

export { customStyles, customTheme }