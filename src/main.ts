import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { definePreset } from '@primevue/themes'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import AnimateOnScroll from 'primevue/animateonscroll';
import './style.css'
import Nora from '@primevue/themes/nora';
import StyleClass from 'primevue/styleclass';
import App from './App.vue'
import router from './router'
import Ripple from 'primevue/ripple';

const app = createApp(App)
app.directive('animateonscroll', AnimateOnScroll)
app.directive('styleclass', StyleClass);
app.directive('ripple', Ripple);
app.use(ToastService);
app.use(ConfirmationService);

const MyPreset = definePreset(Nora, {
  semantic: {
    secondary: {
      50:  '#f6f6f6', // lightest tint
      100: '#e8e8e8',
      200: '#cacedb',
      300: '#a5aff9',
      400: '#7b88f5',
      500: '#3547EA', // base
      600: '#2d3ecc',
      700: '#2433a3',
      800: '#1a267a',
      900: '#111a52',
      950: '#0b1136', // near black with blue hint
    },
    primary: {
      50:  '#f6f6f6', // very light gray
      100: '#e8e8e8',
      200: '#cfcfcf',
      300: '#a6a6a6',
      400: '#737373',
      500: '#171717', // base
      600: '#121212',
      700: '#0e0e0e',
      800: '#0a0a0a',
      900: '#050505',
      950: '#000000', // pure black
    },
  },
  components: {
    button: {
      sm: {
        fontsize: '3em',
      },
      colorScheme: {
        light: {
          root: {
            paddingX: '1em',
            paddingY: '0.5em',
            borderRadius: '0.5em',
            primary: {
              color: '{primary.50}',
              background: 'linear-gradient(to right, #162456, #1d4ed8, #6d28d9)',
              hoverColor: '{primary.500}',
              hoverBackground: '{primary.50}'
            },
            secondary: {
              color: '{secondary.500}',
              borderColor: '{secondary.500}'
            },

          }
        },
        dark: {
          root: {
            paddingX: '1em',
            paddingY: '0.5em',
            borderRadius: '0.5em',
            primary: {
              color: '{primary.50}',
              background: 'linear-gradient(to right, #162456, #1d4ed8, #6d28d9)',
              hoverColor: '{primary.50}',
              hoverBackground: '{primary.500}'
            },
            outlined: {
              secondary: {
                color: '{primary.50}',
                borderColor: '{primary.50}'
              }
            },
            secondary: {
              color: '{primary.50}',
              background: '{secondary.500}',
              borderColor: '{secondary.500}',
            },

          }
        }
      }
    },
    menubar: {
      colorScheme: {
        light: {
          item: {
            focus: {
              color: '{primary.50}',
              background: '{secondary.500}'
            }
          },
          mobile: {
            button: {
              size: '5em'
            }
          }
        },
        dark: {
          item: {
            focus: {
              color: '{primary.50}',
              background: '{secondary.500}'
            }
          },
          mobile: {
            button: {
              size: '30px'
            }
          },
        }
      }
    },
    inputtext: {
      root: {
        root: {
          borderColor: 'transparent',
          borderRadius: '0.5em'
        }
      }
    },
    inputgroup: {
      addon: {
        root: {
          borderColor: 'transparent',
        }
      }
    },
    menu: {
      root:{
        borderColor: 'transparent',
        submenu: {
          label: {
            padding: '0.5em',
            color: '{secondary.400}',
            backgroundColor: ''
          }
        },
        item: {
          padding: '0',
          color: '{primary.50}',
          background: '{primary.50}',
          focusBackground: '{secondary.400}',
          focusColor: '{primary.50}'
        }
      }
    },
    toggleswitch: {
      root: {
        background: '{primary.50}',
        checked: {
          background: '{primary.50}',
          color: '{primary.50}',
          hoverBackground: '{primary.50}',
        },

      }
    },
    dialog: {
      root: {
        borderRadius: '0.5em'
      }
    },
    card: {
      colorScheme: {
        light: {
          background: 'red'
        },
        dark: {
          background: '{primary.500}'
        }
      }
    }

  }

})

app.use(PrimeVue, {
	theme: {
		preset: MyPreset,
    options : {
      prefix: 'p',
      darkModeSelector: '.my-app-dark',
      cssLayer: false
    },

	},
});
app.use(createPinia())
app.use(router)
app.use(ConfirmationService)

app.mount('#app')
