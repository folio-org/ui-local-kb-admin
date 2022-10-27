import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import JobForm from './JobForm';
import translationsProperties from '../../../../test/helpers';

const onSubmit = jest.fn();

const onDownloadFile = jest.fn();
const onUploadFile = jest.fn();
const onClose = jest.fn();

jest.mock('../KbartFields', () => () => <div>KBartFields</div>);

describe('FormLines', () => {
  describe('JSON upload', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <JobForm
            format="JSON"
            handlers={{
              onClose,
              onDownloadFile,
              onUploadFile
            }}
            onSubmit={onSubmit}
          />
        </MemoryRouter>, translationsProperties
      );
    });

    test('renders the new JSON job pane', () => {
      const { getByText } = renderComponent;
      expect(getByText('New JSON job'));
    });

    test('renders the upload document field', () => {
      const { getByText } = renderComponent;
      expect(getByText('Drag & drop to upload'));
    });

    test('renders the cancel button', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('button', { name: 'stripes-components.cancel' }));
    });

    test('renders the save and close button', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('button', { name: 'stripes-components.saveAndClose' }));
    });
  });

  describe('KBART upload', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <JobForm
            format="KBART"
            handlers={{
              onClose,
              onDownloadFile,
              onUploadFile
            }}
            onSubmit={onSubmit}
          />
        </MemoryRouter>, translationsProperties
      );
    });

    test('renders the new KBART job pane', () => {
      const { getByText } = renderComponent;
      expect(getByText('New KBART job'));
    });

    test('renders the upload document field', () => {
      const { getByText } = renderComponent;
      expect(getByText('Drag & drop to upload'));
    });

    test('renders the KBART fields', () => {
      const { getByText } = renderComponent;
      expect(getByText('KBartFields'));
    });

    test('renders the cancel button', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('button', { name: 'stripes-components.cancel' }));
    });

    test('renders the save and close button', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('button', { name: 'stripes-components.saveAndClose' }));
    });
  });
});
