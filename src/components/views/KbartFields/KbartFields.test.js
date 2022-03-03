import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { TestForm, renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { Checkbox } from '@folio/stripes-testing';

import KbartFields from './KbartFields';
import translationsProperties from '../../../../test/helpers';

const onSubmit = jest.fn();

describe('KbartFields', () => {
  describe('Non trusted KB', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <KbartFields
            localKB={{ trustedSourceTI: false }}
          />
        </TestForm>, translationsProperties
      );
    });

    test('renders the Package name field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Package name' }));
    });

    test('renders the Package source field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Package source' }));
    });

    test('renders the Package reference field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Package reference' }));
    });

    test('renders the Package provider field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Package provider' }));
    });

    test('renders the Trusted source for TI data checkbox', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Package provider' }));
    });

    test('renders Trusted source for TI data checkbox', async () => {
      await Checkbox({ id: 'create-kbart-job-trustedSourceTI' }).exists();
    });

    test('Trusted source for TI data checkbox is not checked', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('checkbox', { name: 'Trust this job as a source of title instance metadata' })).not.toHaveAttribute('checked');
    });
  });

  describe('Trusted KB', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <KbartFields
            localKB={{ trustedSourceTI: true }}
          />
        </TestForm>, translationsProperties
      );
    });

    test('renders the Package name field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Package name' }));
    });

    test('renders the Package source field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Package source' }));
    });

    test('renders the Package reference field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Package reference' }));
    });

    test('renders the Package provider field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Package provider' }));
    });

    test('renders the Trusted source for TI data checkbox', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Package provider' }));
    });

    test('renders Trusted source for TI data checkbox', async () => {
      await Checkbox({ id: 'create-kbart-job-trustedSourceTI' }).exists();
    });

    test('Trusted source for TI data checkbox is not checked', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('checkbox', { name: 'Trust this job as a source of title instance metadata' })).toHaveAttribute('checked');
    });
  });
});
