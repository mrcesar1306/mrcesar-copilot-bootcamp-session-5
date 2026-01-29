import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn();

beforeEach(() => {
  global.fetch.mockClear();
  global.fetch.mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );
});

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('should delete todo when delete button is clicked', async () => {
  const testQueryClient = createTestQueryClient();
  const mockTodos = [
    { id: 1, title: 'Test Todo 1', completed: false },
    { id: 2, title: 'Test Todo 2', completed: false },
  ];

  // Mock fetch to return todos initially and handle delete
  global.fetch.mockImplementation((url, options) => {
    if (options?.method === 'DELETE') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    }
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    });
  });

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for todos to load
  await screen.findByText('Test Todo 1');

  // Find and click the delete button for the first todo
  const deleteButton = await screen.findByTestId('delete-todo-1');
  fireEvent.click(deleteButton);

  // Wait for DELETE to be called
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/todos/1'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});

test('should display correct stats for incomplete and completed todos', async () => {
  const testQueryClient = createTestQueryClient();
  const mockTodos = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
    { id: 3, title: 'Todo 3', completed: false },
    { id: 4, title: 'Todo 4', completed: true },
  ];

  global.fetch.mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    })
  );

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for todos to load
  await screen.findByText('Todo 1');

  // Check stats display correct counts
  expect(await screen.findByText('2 items left')).toBeInTheDocument();
  expect(await screen.findByText('2 completed')).toBeInTheDocument();
});

test('should display empty state message when no todos', async () => {
  const testQueryClient = createTestQueryClient();

  global.fetch.mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Check for empty state message
  expect(await screen.findByText(/no todos yet/i)).toBeInTheDocument();
});

test('should display error message when fetch fails', async () => {
  const testQueryClient = createTestQueryClient();

  global.fetch.mockImplementation(() => Promise.reject(new Error('API Error')));

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Check for error message
  expect(await screen.findByText(/error loading todos/i)).toBeInTheDocument();
});

afterEach(() => {
  jest.clearAllMocks();
});
