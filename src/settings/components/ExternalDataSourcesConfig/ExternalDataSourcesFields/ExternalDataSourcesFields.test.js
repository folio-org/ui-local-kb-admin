import React from 'react';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import { MemoryRouter } from 'react-router-dom';

import translationsProperties from '../../../../../test/helpers';
import { input, mutators } from './testResources';
import ExternalDataSourcesFields from './ExternalDataSourcesFields';

const onDeleteMock = jest.fn();
const onSaveMock = jest.fn();

jest.mock('../ExternalDataSourcesView', () => () => <div>ExternalDataSourcesView</div>);

let renderComponent;

describe('ExternalDataSourcesFields', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <ExternalDataSourcesFields
          input={input}
          mutators={mutators}
          onDelete={onDeleteMock}
          onSave={onSaveMock}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  it('renders ExternalDataSourcesView component', () => {
    const { getByText } = renderComponent;
    expect(getByText('ExternalDataSourcesView')).toBeInTheDocument();
  });
});
