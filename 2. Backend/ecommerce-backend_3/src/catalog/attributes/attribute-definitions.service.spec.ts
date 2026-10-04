import { AttributeDefinitionsService } from './attribute-definitions.service';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { AuditService } from '../../audit/audit.service';

function buildService() {
  const prisma = { attributeDefinition: { create: jest.fn(), findMany: jest.fn() } };
  const auditService = { record: jest.fn() };
  return new AttributeDefinitionsService(
    prisma as unknown as PrismaService,
    auditService as unknown as AuditService,
  );
}

describe('AttributeDefinitionsService.validateValue', () => {
  const service = buildService();

  it('accepts a valid TEXT value', () => {
    expect(() =>
      service.validateValue({ key: 'material', type: 'TEXT', allowedValues: null }, 'Cotton'),
    ).not.toThrow();
  });

  it('rejects a non-string TEXT value', () => {
    expect(() =>
      service.validateValue({ key: 'material', type: 'TEXT', allowedValues: null }, 123),
    ).toThrow();
  });

  it('rejects an empty TEXT value', () => {
    expect(() =>
      service.validateValue({ key: 'material', type: 'TEXT', allowedValues: null }, ''),
    ).toThrow();
  });

  it('accepts a valid NUMBER value', () => {
    expect(() =>
      service.validateValue({ key: 'weight_kg', type: 'NUMBER', allowedValues: null }, 1.5),
    ).not.toThrow();
  });

  it('rejects a non-finite NUMBER value', () => {
    expect(() =>
      service.validateValue({ key: 'weight_kg', type: 'NUMBER', allowedValues: null }, Infinity),
    ).toThrow();
    expect(() =>
      service.validateValue({ key: 'weight_kg', type: 'NUMBER', allowedValues: null }, 'abc'),
    ).toThrow();
  });

  it('accepts a valid BOOLEAN value', () => {
    expect(() =>
      service.validateValue({ key: 'is_fragile', type: 'BOOLEAN', allowedValues: null }, true),
    ).not.toThrow();
  });

  it('rejects a non-boolean BOOLEAN value', () => {
    expect(() =>
      service.validateValue({ key: 'is_fragile', type: 'BOOLEAN', allowedValues: null }, 'true'),
    ).toThrow();
  });

  it('accepts a SELECT value present in allowedValues', () => {
    expect(() =>
      service.validateValue(
        { key: 'color', type: 'SELECT', allowedValues: ['red', 'blue'] },
        'red',
      ),
    ).not.toThrow();
  });

  it('rejects a SELECT value absent from allowedValues', () => {
    expect(() =>
      service.validateValue(
        { key: 'color', type: 'SELECT', allowedValues: ['red', 'blue'] },
        'green',
      ),
    ).toThrow();
  });
});

describe('AttributeDefinitionsService.create', () => {
  it('rejects SELECT without allowedValues', async () => {
    const service = buildService();
    await expect(
      service.create('user-1', { key: 'color', label: 'Color', type: 'SELECT' as any }),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });
  });

  it('rejects non-SELECT with allowedValues supplied', async () => {
    const service = buildService();
    await expect(
      service.create('user-1', {
        key: 'weight',
        label: 'Weight',
        type: 'NUMBER' as any,
        allowedValues: ['1', '2'],
      }),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });
  });
});
