/**
 * Copyright 2025 Wingify Software Pvt. Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const RemoveSkipControl = {
  carousal: {
    gradient: {
      heightMultiplier: 0.12,
      isVisible: true,
      top: ['rgba(0,0,0,0.8)', 'transparent'],
      bottom: ['transparent', 'rgba(0,0,0,0.8)'],
    },
    data: [
      {
        imageUrl:
          'https://images.unsplash.com/photo-1597477765682-9047b5d1d2a4?q=80&w=3301&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        useFormatting: true,
        title: {
          content: [
            {
              text: 'Experience ',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            {
              text: 'the world\n',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'normal',
              },
            },
            {
              text: 'your way',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
          ],
        },
        footer: {
          isVisible: false,
          text: 'SAN FRANCISCO',
          style: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1614017214088-351b6fceb704?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        useFormatting: true,
        title: {
          content: [
            {
              text: 'Live ',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            {
              text: 'for the next\n',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'normal',
              },
            },
            {
              text: 'adventure',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
          ],
        },
        footer: {
          isVisible: false,
          text: 'SAN FRANCISCO',
          style: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1635935700701-9b2e1f2f4cc8?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        useFormatting: true,
        title: {
          content: [
            {
              text: 'Wander ',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            {
              text: 'with zero\n',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'normal',
              },
            },
            {
              text: 'limits',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
          ],
        },
        footer: {
          isVisible: false,
          text: 'SAN FRANCISCO',
          style: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
      },
    ],
  },
  skipButton: {
    isVisible: true,
    title: "Skip, I'll explore first",
    style: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
  authOptions: {
    socialAuthEnable: false,
    default: 'email',
    email: {
      id: 'e',
      style: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
      },
      keyboardType: 'email-address',
      text: {
        placeholder: 'Enter your email',
      },
    },
    phoneNumber: {
      id: 'pn',
      style: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
      },
      keyboardType: 'phone-pad',
      text: {
        placeholder: 'Enter your phone number',
      },
    },
    socialMedia: {
      style: {
        width: 40,
        height: 40,
      },
      providers: [
        {
          id: 'go',
          name: 'google',
          isVisible: true,
          imageUrl:
            'https://imgs.search.brave.com/3v18wAfl8TfhyCKXMV4fq6inSt92G5YC3KRiq9n51wk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9nb29nbGUt/aWNvbi0yMDQ4eDIw/NDgtY3puM2c4eDgu/cG5n',
        },
        {
          id: 'x',
          name: 'x',
          isVisible: true,
          imageUrl:
            'https://img.freepik.com/premium-psd/black-brand-new-twitter-x-logo-icon-round_1129635-4.jpg?semt=ais_hybrid&w=740',
        },
        {
          id: 'em',
          name: 'email',
          isVisible: true,
          imageUrl: 'https://static-00.iconduck.com/assets.00/email-icon-256x203-zt992cix.png',
        },
      ],
    },
  },
  cta: {
    title: 'Continue',
    style: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
};

export const PersonalizeLocation = {
  carousal: {
    gradient: {
      heightMultiplier: 0.12,
      isVisible: true,
      top: ['rgba(255,255,255,0.8)', 'transparent'],
      bottom: ['transparent', 'rgba(0,0,0,0.8)'],
    },
    data: [
      {
        imageUrl:
          'https://images.unsplash.com/photo-1535515505622-7621ebc4fc58?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        useFormatting: true,
        title: {
          content: [
            {
              text: 'Explore ',
              style: {
                color: 'black',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            {
              text: "America's\n",
              style: {
                color: 'black',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            {
              text: 'Majesty',
              style: {
                color: 'black',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
          ],
        },
        footer: {
          isVisible: true,
          text: 'GRAND CANYON',
          style: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        useFormatting: true,
        title: {
          content: [
            {
              text: 'Experience ',
              style: {
                color: 'black',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            {
              text: 'the City\n',
              style: {
                color: 'black',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            {
              text: 'That Never Sleeps',
              style: {
                color: 'black',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
          ],
        },
        footer: {
          isVisible: true,
          text: 'NEW YORK',
          style: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1675478631822-fb663199ccde?q=80&w=2436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        useFormatting: true,
        title: {
          content: [
            {
              text: 'Discover ',
              style: {
                color: 'black',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            {
              text: 'the Golden\n',
              style: {
                color: 'black',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            {
              text: 'West',
              style: {
                color: 'black',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
          ],
        },
        footer: {
          isVisible: true,
          text: 'SAN FRANCISCO',
          style: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
      },
    ],
  },
  skipButton: {
    isVisible: false,
    title: "Skip, I'll explore first",
    style: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
  authOptions: {
    socialAuthEnable: true,
    default: 'phoneNumber',
    email: {
      id: 'e',
      style: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
      },
      keyboardType: 'email-address',
      text: {
        placeholder: 'Enter your email',
      },
    },
    phoneNumber: {
      id: 'pn',
      style: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
      },
      keyboardType: 'phone-pad',
      text: {
        placeholder: 'Enter your phone number',
      },
    },
    socialMedia: {
      style: {
        width: 40,
        height: 40,
      },
      providers: [
        {
          id: 'go',
          name: 'google',
          isVisible: true,
          imageUrl:
            'https://imgs.search.brave.com/3v18wAfl8TfhyCKXMV4fq6inSt92G5YC3KRiq9n51wk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9nb29nbGUt/aWNvbi0yMDQ4eDIw/NDgtY3puM2c4eDgu/cG5n',
        },
        {
          id: 'x',
          name: 'x',
          isVisible: true,
          imageUrl:
            'https://img.freepik.com/premium-psd/black-brand-new-twitter-x-logo-icon-round_1129635-4.jpg?semt=ais_hybrid&w=740',
        },
        {
          id: 'em',
          name: 'email',
          isVisible: true,
          imageUrl: 'https://static-00.iconduck.com/assets.00/email-icon-256x203-zt992cix.png',
        },
      ],
    },
  },
  cta: {
    title: 'Continue',
    style: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
};

export const PersonalizeControl = {
  carousal: {
    gradient: {
      heightMultiplier: 0.12,
      isVisible: true,
      top: ['rgba(0,0,0,0.8)', 'transparent'],
      bottom: ['transparent', 'rgba(0,0,0,0.8)'],
    },
    data: [
      {
        imageUrl:
          'https://images.unsplash.com/photo-1597477765682-9047b5d1d2a4?q=80&w=3301&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        useFormatting: true,
        title: {
          content: [
            {
              text: 'Experience ',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            {
              text: 'the world\n',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'normal',
              },
            },
            {
              text: 'yourway',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
          ],
        },
        footer: {
          isVisible: false,
          text: 'SAN FRANCISCO',
          style: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1614017214088-351b6fceb704?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        useFormatting: true,
        title: {
          content: [
            {
              text: 'Live ',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            {
              text: 'for the next \n',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'normal',
              },
            },
            {
              text: 'adventure',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
          ],
        },
        footer: {
          isVisible: false,
          text: 'SAN FRANCISCO',
          style: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1635935700701-9b2e1f2f4cc8?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        useFormatting: true,
        title: {
          content: [
            {
              text: 'Wander ',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            {
              text: 'with zero \n',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'normal',
              },
            },
            {
              text: 'limits',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
          ],
        },
        footer: {
          isVisible: false,
          text: 'SAN FRANCISCO',
          style: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
      },
    ],
  },
  skipButton: {
    isVisible: false,
    title: "Skip, I'll explore first",
    style: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
  authOptions: {
    socialAuthEnable: true,
    default: 'phoneNumber',
    email: {
      id: 'e',
      style: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
      },
      keyboardType: 'email-address',
      text: {
        placeholder: 'Enter your email',
      },
    },
    phoneNumber: {
      id: 'pn',
      style: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
      },
      keyboardType: 'phone-pad',
      text: {
        placeholder: 'Enter your phone number',
      },
    },
    socialMedia: {
      style: {
        width: 40,
        height: 40,
      },
      providers: [
        {
          id: 'go',
          name: 'google',
          isVisible: true,
          imageUrl:
            'https://imgs.search.brave.com/3v18wAfl8TfhyCKXMV4fq6inSt92G5YC3KRiq9n51wk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9nb29nbGUt/aWNvbi0yMDQ4eDIw/NDgtY3puM2c4eDgu/cG5n',
        },
        {
          id: 'x',
          name: 'x',
          isVisible: true,
          imageUrl:
            'https://img.freepik.com/premium-psd/black-brand-new-twitter-x-logo-icon-round_1129635-4.jpg?semt=ais_hybrid&w=740',
        },
        {
          id: 'em',
          name: 'email',
          isVisible: true,
          imageUrl: 'https://static-00.iconduck.com/assets.00/email-icon-256x203-zt992cix.png',
        },
      ],
    },
  },
  cta: {
    title: 'Continue',
    style: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
};

export const RemoveSkipEnabled = {
  carousal: {
    gradient: {
      heightMultiplier: 0.12,
      isVisible: true,
      top: ['rgba(0,0,0,0.8)', 'transparent'],
      bottom: ['transparent', 'rgba(0,0,0,0.8)'],
    },
    data: [
      {
        imageUrl:
          'https://images.unsplash.com/photo-1597477765682-9047b5d1d2a4?q=80&w=3301&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        useFormatting: true,
        title: {
          content: [
            {
              text: 'Experience ',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            {
              text: 'the world \n',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'normal',
              },
            },
            {
              text: 'your way',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
          ],
        },
        footer: {
          isVisible: false,
          text: 'SAN FRANCISCO',
          style: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1614017214088-351b6fceb704?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        useFormatting: true,
        title: {
          content: [
            {
              text: 'Live ',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            {
              text: 'for the next\n',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'normal',
              },
            },
            {
              text: 'adventure',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
          ],
        },
        footer: {
          isVisible: false,
          text: 'SAN FRANCISCO',
          style: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1635935700701-9b2e1f2f4cc8?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        useFormatting: true,
        title: {
          content: [
            {
              text: 'Wander ',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            {
              text: 'with zero\n',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'normal',
              },
            },
            {
              text: 'limits',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
          ],
        },
        footer: {
          isVisible: false,
          text: 'SANFRANCISCO',
          style: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
      },
    ],
  },
  skipButton: {
    isVisible: false,
    title: "Skip, I'll explore first",
    style: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
  authOptions: {
    socialAuthEnable: false,
    default: 'email',
    email: {
      id: 'e',
      style: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
      },
      keyboardType: 'email-address',
      text: {
        placeholder: 'Enter your email',
      },
    },
    phoneNumber: {
      id: 'pn',
      style: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
      },
      keyboardType: 'phone-pad',
      text: {
        placeholder: 'Enter your phone number',
      },
    },
    socialMedia: {
      style: {
        width: 40,
        height: 40,
      },
      providers: [
        {
          id: 'go',
          name: 'google',
          isVisible: true,
          imageUrl:
            'https://imgs.search.brave.com/3v18wAfl8TfhyCKXMV4fq6inSt92G5YC3KRiq9n51wk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9nb29nbGUt/aWNvbi0yMDQ4eDIw/NDgtY3puM2c4eDgu/cG5n',
        },
        {
          id: 'x',
          name: 'x',
          isVisible: true,
          imageUrl:
            'https://img.freepik.com/premium-psd/black-brand-new-twitter-x-logo-icon-round_1129635-4.jpg?semt=ais_hybrid&w=740',
        },
        {
          id: 'em',
          name: 'email',
          isVisible: true,
          imageUrl: 'https://static-00.iconduck.com/assets.00/email-icon-256x203-zt992cix.png',
        },
      ],
    },
  },
  cta: {
    title: 'Continue',
    style: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
};

export const SignUpControl = {
  carousal: {
    gradient: {
      heightMultiplier: 0.12,
      isVisible: true,
      top: ['rgba(0,0,0,0.8)', 'transparent'],
      bottom: ['transparent', 'rgba(0,0,0,0.8)'],
    },
    data: [
      {
        imageUrl:
          'https://images.unsplash.com/photo-1597477765682-9047b5d1d2a4?q=80&w=3301&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        useFormatting: true,
        title: {
          content: [
            {
              text: 'Experience ',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            {
              text: 'the world\n',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'normal',
              },
            },
            {
              text: 'your way',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
          ],
        },
        footer: {
          isVisible: false,
          text: 'SAN FRANCISCO',
          style: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1614017214088-351b6fceb704?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        useFormatting: true,
        title: {
          content: [
            {
              text: 'Live ',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            {
              text: 'for the next\n',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'normal',
              },
            },
            {
              text: 'adventure',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
          ],
        },
        footer: {
          isVisible: false,
          text: 'SAN FRANCISCO',
          style: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1635935700701-9b2e1f2f4cc8?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        useFormatting: true,
        title: {
          content: [
            {
              text: 'Wander ',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
            {
              text: 'with zero \n',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'normal',
              },
            },
            {
              text: 'limits',
              style: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
              },
            },
          ],
        },
        footer: {
          isVisible: false,
          text: 'SANFRANCISCO',
          style: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
      },
    ],
  },
  skipButton: {
    isVisible: false,
    title: "Skip, I'll explore first",
    style: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
  authOptions: {
    socialAuthEnable: false,
    default: 'email',
    email: {
      id: 'e',
      style: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
      },
      keyboardType: 'email-address',
      text: {
        placeholder: 'Enter your email',
      },
    },
    phoneNumber: {
      id: 'pn',
      style: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
      },
      keyboardType: 'phone-pad',
      text: {
        placeholder: 'Enter your phone number',
      },
    },
    socialMedia: {
      style: {
        width: 40,
        height: 40,
      },
      providers: [
        {
          id: 'go',
          name: 'google',
          isVisible: true,
          imageUrl:
            'https://imgs.search.brave.com/3v18wAfl8TfhyCKXMV4fq6inSt92G5YC3KRiq9n51wk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9nb29nbGUt/aWNvbi0yMDQ4eDIw/NDgtY3puM2c4eDgu/cG5n',
        },
        {
          id: 'x',
          name: 'x',
          isVisible: true,
          imageUrl:
            'https://img.freepik.com/premium-psd/black-brand-new-twitter-x-logo-icon-round_1129635-4.jpg?semt=ais_hybrid&w=740',
        },
        {
          id: 'em',
          name: 'email',
          isVisible: true,
          imageUrl: 'https://static-00.iconduck.com/assets.00/email-icon-256x203-zt992cix.png',
        },
      ],
    },
  },
  cta: {
    title: 'Continue',
    style: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
};

export const SignUpVariation = PersonalizeControl;
