/*******************************************************************************
 * Copyright (c) 2022 Obeo.
 * This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Contributors:
 *     Obeo - initial API and implementation
 *******************************************************************************/
import { useMutation, useSubscription } from '@apollo/client';
import { RepresentationComponentProps } from '@eclipse-sirius/sirius-components-core';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import BarChartIcon from '@material-ui/icons/BarChart';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CloseIcon from '@material-ui/icons/Close';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import LinkIcon from '@material-ui/icons/Link';
import PieChartIcon from '@material-ui/icons/PieChart';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import { useMachine } from '@xstate/react';
import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import {
  addWidgetMutation,
  formDescriptionEditorEventSubscription,
  moveWidgetMutation,
} from './FormDescriptionEditorEventFragment';
import {
  GQLAddWidgetInput,
  GQLAddWidgetMutationData,
  GQLAddWidgetMutationVariables,
  GQLAddWidgetPayload,
  GQLErrorPayload,
  GQLFormDescriptionEditorEventInput,
  GQLFormDescriptionEditorEventSubscription,
  GQLFormDescriptionEditorEventVariables,
  GQLMoveWidgetInput,
  GQLMoveWidgetMutationData,
  GQLMoveWidgetMutationVariables,
  GQLMoveWidgetPayload,
} from './FormDescriptionEditorEventFragment.types';
import {
  FormDescriptionEditorRepresentationContext,
  FormDescriptionEditorRepresentationEvent,
  formDescriptionEditorRepresentationMachine,
  HandleSubscriptionResultEvent,
  HideToastEvent,
  InitializeRepresentationEvent,
  SchemaValue,
  ShowToastEvent,
} from './FormDescriptionEditorRepresentationMachine';
import { Button } from './icons/Button';
import { WidgetEntry } from './WidgetEntry';
import { isKind } from './WidgetOperations';
const isErrorPayload = (payload: GQLAddWidgetPayload | GQLMoveWidgetPayload): payload is GQLErrorPayload =>
  payload.__typename === 'ErrorPayload';

const useFormDescriptionEditorStyles = makeStyles((theme) => ({
  formDescriptionEditor: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  header: {
    padding: '4px 8px 4px 8px',
    display: 'flex',
    flexDirection: 'row',
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    borderTop: '1px solid grey',
  },
  widgets: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid grey',
    padding: '4px 8px 4px 8px',
  },
  widgetKind: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '8px',
    marginBottom: '8px',
    cursor: 'move',
  },
  preview: {
    width: '100%',
    padding: '4px 8px 4px 8px',
    overflowX: 'auto',
    overflowY: 'scroll',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  bottomDropArea: {
    height: '100px',
  },
  dragOver: {
    border: 'dashed 1px red',
  },
  subscribers: {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > *': {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
    },
  },
  avatar: {
    fontSize: '1rem',
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  noFormDescriptionEditor: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
  },
}));

export const FormDescriptionEditorRepresentation = ({
  editingContextId,
  representationId,
  selection,
  setSelection,
}: RepresentationComponentProps) => {
  const classes = useFormDescriptionEditorStyles();

  const [{ value, context }, dispatch] = useMachine<
    FormDescriptionEditorRepresentationContext,
    FormDescriptionEditorRepresentationEvent
  >(formDescriptionEditorRepresentationMachine);
  const { toast, formDescriptionEditorRepresentation } = value as SchemaValue;
  const { id, formDescriptionEditor, subscribers, message } = context;

  const input: GQLFormDescriptionEditorEventInput = {
    id,
    editingContextId,
    formDescriptionEditorId: representationId,
  };
  const variables: GQLFormDescriptionEditorEventVariables = { input };

  const { error } = useSubscription<GQLFormDescriptionEditorEventSubscription, GQLFormDescriptionEditorEventVariables>(
    formDescriptionEditorEventSubscription,
    {
      variables,
      fetchPolicy: 'no-cache',
      skip: formDescriptionEditorRepresentation !== 'ready',
      onSubscriptionData: ({ subscriptionData }) => {
        const handleDataEvent: HandleSubscriptionResultEvent = {
          type: 'HANDLE_SUBSCRIPTION_RESULT',
          result: subscriptionData,
        };
        dispatch(handleDataEvent);
      },
      onSubscriptionComplete: () => {
        dispatch({ type: 'HANDLE_COMPLETE' });
      },
    }
  );

  const [addWidget, { loading: addWidgetLoading, data: addWidgetData, error: addWidgetError }] = useMutation<
    GQLAddWidgetMutationData,
    GQLAddWidgetMutationVariables
  >(addWidgetMutation);

  useEffect(() => {
    if (!addWidgetLoading) {
      if (addWidgetError) {
        const message: string = addWidgetError.message;
        const showToastEvent: ShowToastEvent = { type: 'SHOW_TOAST', message };
        dispatch(showToastEvent);
      }
      if (addWidgetData) {
        const { addWidget } = addWidgetData;
        if (isErrorPayload(addWidget)) {
          const { message } = addWidget;
          const showToastEvent: ShowToastEvent = { type: 'SHOW_TOAST', message };
          dispatch(showToastEvent);
        }
      }
    }
  }, [addWidgetLoading, addWidgetData, addWidgetError, dispatch]);

  const [moveWidget, { loading: moveWidgetLoading, data: moveWidgetData, error: moveWidgetError }] = useMutation<
    GQLMoveWidgetMutationData,
    GQLMoveWidgetMutationVariables
  >(moveWidgetMutation);

  useEffect(() => {
    if (!moveWidgetLoading) {
      if (moveWidgetError) {
        const message: string = moveWidgetError.message;
        const showToastEvent: ShowToastEvent = { type: 'SHOW_TOAST', message };
        dispatch(showToastEvent);
      }
      if (moveWidgetData) {
        const { moveWidget } = moveWidgetData;
        if (isErrorPayload(moveWidget)) {
          const { message } = moveWidget;
          const showToastEvent: ShowToastEvent = { type: 'SHOW_TOAST', message };
          dispatch(showToastEvent);
        }
      }
    }
  }, [moveWidgetLoading, moveWidgetData, moveWidgetError, dispatch]);

  useEffect(() => {
    if (error) {
      const message: string = 'An error has occurred while trying to retrieve the form description editor';
      const showToastEvent: ShowToastEvent = { type: 'SHOW_TOAST', message };
      dispatch(showToastEvent);
      dispatch({ type: 'HANDLE_COMPLETE' });
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (formDescriptionEditorRepresentation === 'loading') {
      const initializeRepresentationEvent: InitializeRepresentationEvent = {
        type: 'INITIALIZE',
      };
      dispatch(initializeRepresentationEvent);
    }
  }, [formDescriptionEditorRepresentation, dispatch]);

  const handleDragStart: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.dataTransfer.setData('text/plain', event.currentTarget.id);
  };
  const handleDragEnter: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add(classes.dragOver);
  };
  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add(classes.dragOver);
  };
  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove(classes.dragOver);
  };
  const handleDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove(classes.dragOver);

    const id: string = event.dataTransfer.getData('text/plain');
    let index = formDescriptionEditor.widgets.length;

    if (isKind(id)) {
      const addWidgetInput: GQLAddWidgetInput = {
        id: uuid(),
        editingContextId,
        representationId,
        containerId: null,
        kind: id,
        index,
      };
      const addWidgetVariables: GQLAddWidgetMutationVariables = { input: addWidgetInput };
      addWidget({ variables: addWidgetVariables });
    } else {
      if (formDescriptionEditor.widgets.find((w) => w.id === id)) {
        index--;
      }
      const moveWidgetInput: GQLMoveWidgetInput = {
        id: uuid(),
        editingContextId,
        representationId,
        containerId: null,
        widgetId: id,
        index,
      };
      const moveWidgetVariables: GQLMoveWidgetMutationVariables = { input: moveWidgetInput };
      moveWidget({ variables: moveWidgetVariables });
    }
  };

  let content: JSX.Element | null = null;

  if (formDescriptionEditorRepresentation === 'ready' && formDescriptionEditor) {
    content = (
      <div className={classes.main}>
        <div className={classes.widgets}>
          <Typography gutterBottom>Widgets</Typography>
          <div
            id="Textfield"
            data-testid="FormDescriptionEditor-Textfield"
            draggable="true"
            className={classes.widgetKind}
            onDragStart={handleDragStart}>
            <TextFieldsIcon />
            <Typography variant="caption" gutterBottom>
              Textfield
            </Typography>
          </div>
          <div
            id="TextArea"
            data-testid="FormDescriptionEditor-TextArea"
            draggable="true"
            className={classes.widgetKind}
            onDragStart={handleDragStart}>
            <TextFieldsIcon />
            <Typography variant="caption" gutterBottom>
              Textarea
            </Typography>
          </div>
          <div
            id="Checkbox"
            data-testid="FormDescriptionEditor-Checkbox"
            draggable="true"
            className={classes.widgetKind}
            onDragStart={handleDragStart}>
            <CheckBoxIcon />
            <Typography variant="caption" gutterBottom>
              Checkbox
            </Typography>
          </div>
          <div
            id="Radio"
            data-testid="FormDescriptionEditor-Radio"
            draggable="true"
            className={classes.widgetKind}
            onDragStart={handleDragStart}>
            <RadioButtonCheckedIcon />
            <Typography variant="caption" gutterBottom>
              Radio
            </Typography>
          </div>
          <div
            id="Select"
            data-testid="FormDescriptionEditor-Select"
            draggable="true"
            className={classes.widgetKind}
            onDragStart={handleDragStart}>
            <ArrowDropDownCircleIcon />
            <Typography variant="caption" gutterBottom>
              Select
            </Typography>
          </div>
          <div
            id="MultiSelect"
            data-testid="FormDescriptionEditor-MultiSelect"
            draggable="true"
            className={classes.widgetKind}
            onDragStart={handleDragStart}>
            <ArrowDropDownCircleIcon />
            <Typography variant="caption" gutterBottom>
              MultiSelect
            </Typography>
          </div>
          <div
            id="Label"
            data-testid="FormDescriptionEditor-Label"
            draggable="true"
            className={classes.widgetKind}
            onDragStart={handleDragStart}>
            <LabelOutlinedIcon />
            <Typography variant="caption" gutterBottom>
              Label
            </Typography>
          </div>
          <div
            id="Button"
            data-testid="FormDescriptionEditor-Button"
            draggable="true"
            className={classes.widgetKind}
            onDragStart={handleDragStart}>
            <Button width={'24px'} height={'24px'} color={'secondary'} />
            <Typography variant="caption" gutterBottom>
              Button
            </Typography>
          </div>
          <div
            id="Link"
            data-testid="FormDescriptionEditor-Link"
            draggable="true"
            className={classes.widgetKind}
            onDragStart={handleDragStart}>
            <LinkIcon />
            <Typography variant="caption" gutterBottom>
              Link
            </Typography>
          </div>
          <div
            id="List"
            data-testid="FormDescriptionEditor-List"
            draggable="true"
            className={classes.widgetKind}
            onDragStart={handleDragStart}>
            <FormatListBulletedIcon />
            <Typography variant="caption" gutterBottom>
              List
            </Typography>
          </div>
          <div
            id="BarChart"
            data-testid="FormDescriptionEditor-BarChart"
            draggable="true"
            className={classes.widgetKind}
            onDragStart={handleDragStart}>
            <BarChartIcon />
            <Typography variant="caption" gutterBottom>
              BarChart
            </Typography>
          </div>
          <div
            id="PieChart"
            data-testid="FormDescriptionEditor-PieChart"
            draggable="true"
            className={classes.widgetKind}
            onDragStart={handleDragStart}>
            <PieChartIcon />
            <Typography variant="caption" gutterBottom>
              PieChart
            </Typography>
          </div>
          <div
            id="FlexboxContainer"
            data-testid="FormDescriptionEditor-FlexboxContainer"
            draggable="true"
            className={classes.widgetKind}
            onDragStart={handleDragStart}>
            <ViewColumnIcon width={'24px'} height={'24px'} color={'secondary'} />
            <Typography variant="caption" gutterBottom align="center">
              Flexbox Container
            </Typography>
          </div>
        </div>
        <div className={classes.preview}>
          <Typography>Preview</Typography>
          <div className={classes.body}>
            {formDescriptionEditor.widgets.map((widget) => (
              <WidgetEntry
                key={widget.id}
                editingContextId={editingContextId}
                representationId={representationId}
                containerId={null}
                siblings={formDescriptionEditor.widgets}
                widget={widget}
                selection={selection}
                setSelection={setSelection}
                flexDirection={'column'}
                flexGrow={1}
              />
            ))}
            <div
              data-testid="FormDescriptionEditor-DropArea"
              className={classes.bottomDropArea}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
          </div>
        </div>
      </div>
    );
  }

  if (formDescriptionEditorRepresentation === 'complete') {
    content = (
      <div className={classes.main + ' ' + classes.noFormDescriptionEditor}>
        <Typography variant="h5" align="center" data-testid="FormDescriptionEditor-complete-message">
          The form description editor does not exist
        </Typography>
      </div>
    );
  }

  return (
    <div className={classes.formDescriptionEditor}>
      <div className={classes.header}>
        <Typography>Form</Typography>
        <div className={classes.subscribers}>
          {subscribers.map((subscriber) => (
            <Tooltip title={subscriber.username} arrow key={subscriber.username}>
              <Avatar classes={{ root: classes.avatar }}>{subscriber.username.substring(0, 1).toUpperCase()}</Avatar>
            </Tooltip>
          ))}
        </div>
      </div>
      {content}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={toast === 'visible'}
        autoHideDuration={3000}
        onClose={() => dispatch({ type: 'HIDE_TOAST' } as HideToastEvent)}
        message={message}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => dispatch({ type: 'HIDE_TOAST' } as HideToastEvent)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        data-testid="error"
      />
    </div>
  );
};