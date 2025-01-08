import React from 'react';
import { TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { Trash2Icon } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '../ui/alert-dialog';

interface DeleteWithDialogProps {
    tooltipContent: string;
    dialogTitle: string;
    dialogDescription: string;
    onConfirm: () => void;
}

const DeleteWithDialog: React.FC<DeleteWithDialogProps> = ({
    tooltipContent,
    dialogTitle,
    dialogDescription,
    onConfirm,
}) => {
    return (
        <AlertDialog>
            <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                    <div>
                        <Trash2Icon className="cursor-pointer text-red-500" />
                    </div>
                </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltipContent}</p>
            </TooltipContent>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteWithDialog;
