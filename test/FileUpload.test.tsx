import { test, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { FileUpload } from '../src/FileUpload';

test('using Vitest Browser Mode Interactivity API', async () => {
  const screen = render(<FileUpload />);

  // 1. Create a file with exactly 4 bytes of content
  const fileContent = 'test';
  const file = new File([fileContent], 'test.pdf', { type: 'application/pdf' });

  // 2. Perform the upload using the Vitest Browser Mode Interactivity API
  const input = screen.getByTestId('file-input');
  await input.upload(file);

  // 3. Assertion
  const debugOutput = screen.getByTestId('debug-output');

  // Check Size (Expect 4)
  await expect
    .element(debugOutput)
    .toHaveTextContent(`Size: 4`);

  // Check Content (Expect "test")
  await expect
    .element(debugOutput)
    .toHaveTextContent(`Content: test`);
});


test('using an actual file', async () => {
  const screen = render(<FileUpload />);

  // 2. Perform the upload using an actual file
  const input = screen.getByTestId('file-input');
  await input.upload('./test.pdf');

  // 3. Assertion
  const debugOutput = screen.getByTestId('debug-output');

  // Check Size (Expect 4)
  await expect
    .element(debugOutput)
    .toHaveTextContent(`Size: 4`);

  // Check Content (Expect "test")
  await expect
    .element(debugOutput)
    .toHaveTextContent(`Content: test`);
});

test('using DataTransfer API', async () => {
  const screen = render(<FileUpload />);

  // 1. Create a file with exactly 4 bytes of content
  const fileContent = 'test';
  const file = new File([fileContent], 'test.pdf', { type: 'application/pdf' });

  // 2. Perform the upload using the DataTransfer API
  const input = screen.getByTestId('file-input').element() as HTMLInputElement;

  const dt = new DataTransfer()
  dt.items.add(file)
  input.files = dt.files
  
  // Manually dispatch the change event to trigger React's handler
  input.dispatchEvent(new Event('change', { bubbles: true }))

  // 3. Assertion
  const debugOutput = screen.getByTestId('debug-output');

  // Check Size (Expect 4)
  await expect
    .element(debugOutput)
    .toHaveTextContent(`Size: 4`);

  // Check Content (Expect "test")
  await expect
    .element(debugOutput)
    .toHaveTextContent(`Content: test`);
});
