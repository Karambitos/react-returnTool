# Return Tool

The Return Tool is a web-based application designed to streamline the process of handling return orders within logistics operations. It provides components for selecting and managing return IDs, logistician details, and displaying order summaries.

## Introduction

The Return Tool is built to assist logistics teams in managing return orders efficiently. It utilizes React for front-end development, incorporating components such as ID selection, logistician selection, order summary display, and annotation management. The tool enhances user experience by providing intuitive interfaces for data input and visualization.

## Project structure

```
react-returnTool/
├── public/
│ ├── index.html
│ └── ...
├── src/
│ ├── components/
│ │ ├── Layout
│ │ │ └── Layout.tsx
│ │ ├── Return
│ │ │ ├── Annotation
│ │ │ │ ├── Annotation.tsx
│ │ │ │ └── Annotation.test.tsx
│ │ │ ├── IDSelection
│ │ │ │ ├── IDSelection.tsx
│ │ │ │ └── IDSelection.test.tsx
│ │ │ ├── ItemSelection
│ │ │ │ ├── ItemSelection.tsx
│ │ │ │ └── ItemSelection.test.tsx
│ │ │ ├── LogisticianSelection
│ │ │ │ ├── LogisticianSelection.tsx
│ │ │ │ └── LogisticianSelection.test.tsx
│ │ │ ├── Summary
│ │ │ │ ├── Summary.tsx
│ │ │ │ └── Summary.test.tsx
│ │ │ ├── WarehouseSelection
│ │ │ │ ├── WarehouseSelection.tsx
│ │ │ │ └── WarehouseSelection.test.tsx
│ │ │ ├── Return.tsx
│ │ │ └── index.ts
│ │ ├── mockup.json
│ │ └── index.ts
│ ├── hooks/
│ │ ├── useDataOrder.ts
│ │ └── useQuestions.ts
│ ├── pages/
│ │ ├── Home.tsx
│ │ ├── index.tsx
│ │ └── NotFound
│ ├── types/
│ │ └── index.ts
│ ├── App.tsx
│ ├── index.tsx
│ ├── theme.ts
│ └── ... (other configuration and utility files)
├── .gitignore
├── package.json
├── tsconfig.json
└── ... (other configuration files)
```

## Components

###  - Annotation Component
The Annotation component facilitates adding and editing annotations for individual items within the return order. It allows users to provide additional notes or comments related to specific items, enhancing communication and tracking during the return process.

###  - IDSelection Component
The IDSelection component allows users to select and validate either delivery IDs or delivery order IDs, depending on the type chosen. It includes error validation for ensuring correct data entry and updates the application state accordingly.

###  - ItemSelection Component
The ItemSelection component allows users to select items related to the return order. It provides a list of items with quantities and reasons for return, enhancing the ability to manage and track individual return items effectively.

###  - LogisticianSelection Component
The LogisticianSelection component enables users to choose from predefined logistic companies. It provides a dropdown interface with options to select the logistics service handling the return order.

###  - Summary Component
The Summary component displays a comprehensive overview of the return order details, including the logistician assigned, warehouse information, and a list of shipped items with associated quantities, reasons for return, and annotations.

###  - WarehouseSelection Component
The WarehouseSelection component enables users to choose the warehouse location associated with the return order. It provides a dropdown interface with options to select from available warehouse locations, ensuring accurate logistics management.

## Custom Hooks

###  - useDataOrder Hook
The useDataOrder hook manages data fetching from a mock API endpoint (https://666c0f8e49dbc5d7145c6eb1.mockapi.io/api/v1) based on provided delivery IDs or delivery order IDs. It handles loading states, error handling, and updates the application state with fetched order details.
###  - useQuestions Hook
The useQuestions hook manages a predefined list of questions related to return reasons. It provides utility functions to retrieve question texts based on specific string values, enhancing descriptive clarity within the application.

## Testing

The project includes unit tests to verify the functionality of key components. These tests are written using Jest and React Testing Library.

##  Setup and Installation
To run the Return Tool locally, follow these steps:

### Clone the repository:
`git clone https://github.com/Karambitos/react-returnTool.git` \
`cd return-tool`

### Install dependencies:
### `npm install`

### Run the application:
### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Run test:
### `npm run test`
Launches the test runner in the interactive watch mode.\

##  Additional Resources
[React Documentation](https://legacy.reactjs.org/) - Official React documentation for learning and reference.
[Material-UI](https://mui.com/material-ui/) - Documentation - Material-UI library documentation for styling and UI components.
[Jest Documentation](https://jestjs.io/docs/getting-started) - Jest documentation for testing React applications.
[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - React Testing Library documentation for testing React components.
[MockAPI](https://mockapi.io/) - MockAPI documentation for creating mock API endpoints.


### List of Delivery IDs and Delivery Order IDs for Testing

```json
[
  {
    "id": 1,
    "deliveryId": "9623862100000",
    "deliveryOrderId": "447654b3-2c3c-4652-9ef2-fdc5da2554ad",
    "shippedItems": [
      {
        "sku": "4899046688999",
        "quantity": 12
      },
      {
        "sku": "4567222300001",
        "quantity": 1
      }
    ]
  },
  {
    "id": 2,
    "deliveryId": "9623862100001",
    "deliveryOrderId": "447654b3-2c3c-4652-9ef2-fdc5da2554b6",
    "shippedItems": [
      {
        "sku": "4899046688109",
        "quantity": 1
      }
    ]
  },
  {
    "id": 3,
    "deliveryId": "9623862100002",
    "deliveryOrderId": "5367acf7-1a0c-4eec-9128-25b91ec230e7",
    "shippedItems": [
      {
        "sku": "4567222311111",
        "quantity": 1
      }
    ]
  },
  {
    "id": 4,
    "deliveryId": "9623862100003",
    "deliveryOrderId": "d83136f0-2f89-4f6b-bad8-c97ac80527a7",
    "shippedItems": [
      {
        "sku": "7891234500000",
        "quantity": 5
      },
      {
        "sku": "6789123400000",
        "quantity": 3
      }
    ]
  },
  {
    "id": 5,
    "deliveryId": "9623862100004",
    "deliveryOrderId": "a4e10a26-7e93-47c8-8a7a-8f8702c72152",
    "shippedItems": [
      {
        "sku": "2345678900000",
        "quantity": 2
      }
    ]
  },
  {
    "id": 6,
    "deliveryId": "9623862100005",
    "deliveryOrderId": "d3b56f3b-5ea6-4ae1-9fa6-95738b3ecfa4",
    "shippedItems": [
      {
        "sku": "3456789011111",
        "quantity": 10
      }
    ]
  },
  {
    "id": 7,
    "deliveryId": "9623862100006",
    "deliveryOrderId": "b4f5d0b5-1aa5-47e6-bf04-7f3eab0c6a12",
    "shippedItems": [
      {
        "sku": "4567890122222",
        "quantity": 4
      }
    ]
  },
  {
    "id": 8,
    "deliveryId": "9623862100007",
    "deliveryOrderId": "4e279c8a-933c-40a3-bf57-9e1e173eeed7",
    "shippedItems": [
      {
        "sku": "5678901233333",
        "quantity": 8
      }
    ]
  },
  {
    "id": 9,
    "deliveryId": "9623862100008",
    "deliveryOrderId": "85b47b0e-11c7-48a6-a02a-21a7a77b8c72",
    "shippedItems": [
      {
        "sku": "6789012344444",
        "quantity": 15
      }
    ]
  },
  {
    "id": 10,
    "deliveryId": "9623862100009",
    "deliveryOrderId": "67b16687-b514-48f8-bb7b-77560f0e3baf",
    "shippedItems": [
      {
        "sku": "7890123455555",
        "quantity": 6
      }
    ]
  },
  {
    "id": 11,
    "deliveryId": "9623862100010",
    "deliveryOrderId": "e83187b7-4e1c-426d-8c27-03a1eb2d5a92",
    "shippedItems": [
      {
        "sku": "8901234566666",
        "quantity": 9
      }
    ]
  },
  {
    "id": 12,
    "deliveryId": "9623862100011",
    "deliveryOrderId": "2cc6ed6b-ef18-4d3b-83bc-6d6971e32d76",
    "shippedItems": [
      {
        "sku": "9012345677777",
        "quantity": 7
      }
    ]
  },
  {
    "id": 13,
    "deliveryId": "9623862100012",
    "deliveryOrderId": "a2fc87a6-0e36-453b-9c63-23e7f275b8a4",
    "shippedItems": [
      {
        "sku": "0123456788888",
        "quantity": 18
      }
    ]
  },
  {
    "id": 14,
    "deliveryId": "9623862100013",
    "deliveryOrderId": "f9038c2f-2e03-4c16-9aef-bac4e50a05cd",
    "shippedItems": [
      {
        "sku": "1234567899999",
        "quantity": 3
      }
    ]
  },
  {
    "id": 15,
    "deliveryId": "9623862100014",
    "deliveryOrderId": "ebf6c01d-d6f3-479c-8e8e-1ae83f17e004",
    "shippedItems": [
      {
        "sku": "2345678900000",
        "quantity": 14
      }
    ]
  },
  {
    "id": 16,
    "deliveryId": "9623862100015",
    "deliveryOrderId": "d4f9ee25-7e7c-46a7-9506-8a4e1f6b5700",
    "shippedItems": [
      {
        "sku": "3456789011111",
        "quantity": 11
      }
    ]
  },
  {
    "id": 17,
    "deliveryId": "9623862100016",
    "deliveryOrderId": "d6ffef18-2ed2-43e4-84c5-31e1340e4f3e",
    "shippedItems": [
      {
        "sku": "4567890122222",
        "quantity": 2
      }
    ]
  },
  {
    "id": 18,
    "deliveryId": "9623862100017",
    "deliveryOrderId": "a0a1ea0f-6c4a-47f8-bc1f-c8fca96a7c0f",
    "shippedItems": [
      {
        "sku": "5678901233333",
        "quantity": 7
      }
    ]
  },
  {
    "id": 19,
    "deliveryId": "9623862100018",
    "deliveryOrderId": "d1760366-07f0-4e7f-94ac-1b3b29e89967",
    "shippedItems": [
      {
        "sku": "6789012344444",
        "quantity": 19
      }
    ]
  },
  {
    "id": 20,
    "deliveryId": "9623862100019",
    "deliveryOrderId": "f36806a8-1a23-4be6-b41e-0a3266f1965e",
    "shippedItems": [
      {
        "sku": "7890123455555",
        "quantity": 4
      }
    ]
  }
]


