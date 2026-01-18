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
      50: '#f6f6f6', // lightest tint
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
      50: '#f6f6f6', // very light gray
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
              hoverBackground: '{primary.50}',
            },
            secondary: {
              color: '{secondary.500}',
              borderColor: '{secondary.500}',
            },
          },
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
              hoverBackground: '{primary.500}',
            },
            outlined: {
              secondary: {
                color: '{primary.50}',
                borderColor: '{primary.50}',
              },
            },
            secondary: {
              color: '{primary.50}',
              background: '{secondary.500}',
              borderColor: '{secondary.500}',
            },
          },
        },
      },
    },
    menubar: {
      colorScheme: {
        light: {
          item: {
            focus: {
              color: '{primary.50}',
              background: '{secondary.500}',
            },
          },
          mobile: {
            button: {
              size: '5em',
            },
          },
        },
        dark: {
          item: {
            focus: {
              color: '{primary.50}',
              background: '{secondary.500}',
            },
          },
          mobile: {
            button: {
              size: '30px',
            },
          },
        },
      },
    },
    inputtext: {
      root: {
        root: {
          borderColor: 'transparent',
          borderRadius: '0.5em',
        },
      },
      colorScheme: {
        light: {
          background: '{primary.100}',
        },
        dark: {
          background: '#262626'
        }
      },
    },
    inputgroup: {
      addon: {
        root: {
          borderColor: 'transparent',
        },
      },
    },
    menu: {
      root: {
        borderColor: 'transparent',
        submenu: {
          label: {
            padding: '0.5em',
            color: '{secondary.400}',
            backgroundColor: '',
          },
        },
        item: {
          padding: '0',
          color: '{primary.50}',
          background: '{primary.50}',
          focusBackground: '{secondary.400}',
          focusColor: '{primary.50}',
        },
      },
    },
    toggleswitch: {
      root: {
        background: '{primary.50}',
        checked: {
          background: '{primary.50}',
          color: '{primary.50}',
          hoverBackground: '{primary.50}',
        },
      },
    },
    dialog: {
      root: {
        borderRadius: '0.5em',
      },
    },
    card: {
      colorScheme: {
        light: {
          background: 'red',
        },
        dark: {
          background: '{primary.500}',
        },
      },
    },
    tabs: {
      transition: {
        duration: '0.2s',
      },
      tablist: {
        background: 'transparent',
        borderColor: '{surface.200}', // Light mode border
        borderWidth: '0 0 1px 0',
      },
      tab: {
        background: 'transparent',
        hoverBackground: 'transparent',
        activeBackground: 'transparent',
        padding: '1rem 1.25rem',
        fontWeight: '600',
        color: '{surface.600}',
        hoverColor: '{surface.900}',
        activeColor: '{secondary.500}',
        gap: '0.5rem',
        focusRing: {
          width: '0', // Clean look without default browser rings
          shadow: 'none',
        },
      },
      activeBar: {
        height: '2px',
        bottom: '-1px',
        background: '{secondary.500}',
      },
      tabpanel: {
        background: 'transparent',
        color: '{surface.700}',
        padding: '1.25rem 0',
      },
      colorScheme: {
        light: {
          tablist: {
            borderColor: '{surface.200}',
          },
          tab: {
            color: '{surface.500}',
            hoverColor: '{surface.800}',
            activeColor: '{secondary.600}',
          },
          activeBar: {
            background: '{secondary.600}',
          },
        },
        dark: {
          tablist: {
            borderColor: '{surface.700}',
          },
          tab: {
            color: '{surface.400}',
            hoverColor: '{surface.0}',
            activeColor: '{secondary.400}',
          },
          activeBar: {
            background: '{secondary.400}',
          },
          tabpanel: {
            color: '{surface.300}',
          },
        },
      },
    },
    paginator: {
      colorScheme: {
        light: {
          background: 'transparent',
        },
        dark: {
          background: 'transparent',
          navButton: {
            selectedBackground: '{primary.50}'
          }
        },
      },
    },
    datatable: {
      header: {
        background: 'transparent',
        borderColor: '{surface.200}',
        color: '{surface.900}',
        padding: '1rem 1rem',
      },
      headerCell: {
        background: 'transparent',
        hoverBackground: '{surface.100}',
        color: '{surface.700}',
        hoverColor: '{surface.900}',
        gap: '0.5rem',
        focusRing: {
          width: '0',
          shadow: 'none',
        },
      },
      row: {
        background: 'transparent',
        hoverBackground: '{surface.50}',
        selectedBackground: '{secondary.50}',
        color: '{surface.700}',
        hoverColor: '{surface.900}',
        selectedColor: '{secondary.700}',
      },
      bodyCell: {
        borderColor: '{surface.200}',
        padding: '1rem 1rem',
      },
      sortIcon: {
        color: '{surface.400}',
        hoverColor: '{secondary.500}',
        size: '0.875rem',
      },
      colorScheme: {
        light: {
          header: {
            borderColor: '{surface.200}',
          },
          row: {
            hoverBackground: '{surface.50}',
            selectedBackground: '{secondary.50}',
          },
          bodyCell: {
            borderColor: '{surface.100}',
          },
        },
        dark: {
          header: {
            background: '{surface.900}',
            borderColor: '{surface.700}',
            color: '{surface.0}',
          },
          headerCell: {
            hoverBackground: '{surface.800}',
            color: '{surface.300}',
            hoverColor: '{surface.0}',
          },
          row: {
            background: 'transparent',
            hoverBackground: '{surface.800}',
            selectedBackground: '{secondary.900}',
            color: '{surface.300}',
            hoverColor: '{surface.0}',
            selectedColor: '{secondary.100}',
          },
          bodyCell: {
            borderColor: '{surface.700}',
          },
          sortIcon: {
            color: '{surface.500}',
            hoverColor: '{secondary.400}',
          },
        },
      },
    },
    checkbox: {
      root: {
        borderRadius: '4px',
        width: '1.25rem',
        height: '1.25rem',
      },
      colorScheme: {
        light: {
          root: {
            borderColor: '{surface.300}',
            background: '{surface.0}',
          },
          checked: {
            background: '{secondary.500}',
            borderColor: '{secondary.500}',
            color: '#ffffff',
          },
          hover: {
            borderColor: '{secondary.500}',
          }
        },
        dark: {
          root: {
            borderColor: '{surface.600}',
            background: '#171717', // Matching your dark background
          },
          checked: {
            background: '{secondary.400}',
            borderColor: '{secondary.400}',
            color: '{primary.950}', // Dark icon on light blue background
          },
          hover: {
            borderColor: '{secondary.400}',
            background: '{surface.800}',
          },
          focus: {
            ringColor: '{secondary.400}',
          }
        }
      }
    },
  },
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
