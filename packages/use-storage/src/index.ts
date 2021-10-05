import { useCallback, useState } from 'react';

export interface StorageMeta {
  id: string;
  created_at: string;
  modified_at: string;
}

export interface UseStorageMethods<T> {
  attributes: Array<T & StorageMeta>;
  insert: (attribute: T) => void;
  update: (id: StorageMeta['id'], attribute: Partial<T>) => void;
  remove: (id: StorageMeta['id']) => void;
  clear: () => void;
  get: (id: StorageMeta['id']) => T & StorageMeta | undefined;
  getAll: () => Array<Attribute<T>>;
}

export type Attribute<T> = UseStorageMethods<T>['attributes'][number];

export const useStorage = <T>(namespace: string): UseStorageMethods<T> => {
  const storedState = localStorage.getItem(namespace);
  const [attributes, setAttributes] = useState<Attribute<T>[]>(storedState ? JSON.parse(storedState) : []);
  const lastAttribute = attributes[attributes.length - 1];
  const id = String(lastAttribute ? +lastAttribute.id + 1 : 0);

  const save = useCallback((attribute: Attribute<T>[]) => {
    setAttributes(attribute);
    localStorage.setItem(namespace, JSON.stringify(attribute));
  }, [namespace]);

  /**
   * Retrieve a single attribute
   */
  const get = useCallback((id: StorageMeta['id']): Attribute<T> | undefined => {
    return attributes.find((x) => x.id === id);
  }, [attributes]);

  /**
   * Retrieve all attributes
   */
  const getAll = useCallback((): Attribute<T>[] => attributes, [attributes]);

  /**
   * Insert a new attribute
   */
  const insert = useCallback((attribute: T) => {
    const date = new Date().toISOString();
    const newAttributes = [...attributes, { ...attribute, created_at: date, modified_at: date, id }];

    if (get(id)) throw new Error('An attribute with this ID already exists');

    save(newAttributes);
  }, [get, id, attributes, save]);

  /**
   * Update an existing attribute
   */
  const update = useCallback((id: StorageMeta['id'], attribute: Partial<T>) => {
    const updatedAttributes = attributes.map((x) => {
      if (x.id !== id) return x;

      return { ...x, ...attribute, modified_at: new Date().toISOString() };
    });

    save(updatedAttributes);
  }, [attributes, save]);

  /**
   * Remove an existing attribute
   */
  const remove = useCallback((id: StorageMeta['id']) => {
    save(attributes.filter((x) => x.id !== id));
  }, [attributes, save]);

  const clear = useCallback(() => save([]), [save]);

  return { attributes, insert, update, remove, clear, get, getAll };
};