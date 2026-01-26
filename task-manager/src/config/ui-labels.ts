/**
 * UI Labels and Constants
 * Centralized UI text to avoid magic strings
 */

export const TABLE_LABELS = {
  ID: 'ID',
  TITLE: 'Title',
  DESCRIPTION: 'Description',
  DUE_DATE: 'Due date',
  STATE: 'State'
} as const;

export const FORM_LABELS = {
  TITLE: 'Title',
  DESCRIPTION: 'Description',
  DUE_DATE: 'Due Date',
  MARK_COMPLETED: 'Mark as completed'
} as const;

export const BUTTON_LABELS = {
  SAVE: 'Guardar',
  CANCEL: 'Cancelar',
  ADD_TASK: '+ Add task'
} as const;

export const PLACEHOLDER_TEXTS = {
  TITLE: 'Enter task title',
  DESCRIPTION: 'Enter task description'
} as const;

export const ACTION_NAMES = {
  EDIT: 'edit',
  DELETE: 'delete'
} as const;
