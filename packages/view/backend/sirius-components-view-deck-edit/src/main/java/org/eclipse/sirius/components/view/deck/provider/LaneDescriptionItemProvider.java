/*******************************************************************************
 * Copyright (c) 2023, 2024 Obeo.
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
package org.eclipse.sirius.components.view.deck.provider;

import java.util.Collection;
import java.util.List;

import org.eclipse.emf.common.notify.AdapterFactory;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.ecore.EStructuralFeature;
import org.eclipse.emf.edit.provider.ComposeableAdapterFactory;
import org.eclipse.emf.edit.provider.IItemPropertyDescriptor;
import org.eclipse.emf.edit.provider.ItemPropertyDescriptor;
import org.eclipse.emf.edit.provider.ViewerNotification;
import org.eclipse.sirius.components.view.deck.DeckFactory;
import org.eclipse.sirius.components.view.deck.DeckPackage;
import org.eclipse.sirius.components.view.deck.LaneDescription;

/**
 * This is the item provider adapter for a {@link org.eclipse.sirius.components.view.deck.LaneDescription} object. <!--
 * begin-user-doc --> <!-- end-user-doc -->
 *
 * @generated
 */
public class LaneDescriptionItemProvider extends DeckElementDescriptionItemProvider {
    /**
     * This constructs an instance from a factory and a notifier. <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @generated
     */
    public LaneDescriptionItemProvider(AdapterFactory adapterFactory) {
        super(adapterFactory);
    }

    /**
     * This returns the property descriptors for the adapted class. <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @generated
     */
    @Override
    public List<IItemPropertyDescriptor> getPropertyDescriptors(Object object) {
        if (this.itemPropertyDescriptors == null) {
            super.getPropertyDescriptors(object);

            this.addNamePropertyDescriptor(object);
            this.addDomainTypePropertyDescriptor(object);
            this.addIsCollapsibleExpressionPropertyDescriptor(object);
        }
        return this.itemPropertyDescriptors;
    }

    /**
     * This adds a property descriptor for the Name feature. <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @generated
     */
    protected void addNamePropertyDescriptor(Object object) {
        this.itemPropertyDescriptors.add(this.createItemPropertyDescriptor(((ComposeableAdapterFactory) this.adapterFactory).getRootAdapterFactory(), this.getResourceLocator(),
                this.getString("_UI_LaneDescription_name_feature"), this.getString("_UI_PropertyDescriptor_description", "_UI_LaneDescription_name_feature", "_UI_LaneDescription_type"),
                DeckPackage.Literals.LANE_DESCRIPTION__NAME, true, false, false, ItemPropertyDescriptor.GENERIC_VALUE_IMAGE, null, null));
    }

    /**
     * This adds a property descriptor for the Domain Type feature. <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @generated
     */
    protected void addDomainTypePropertyDescriptor(Object object) {
        this.itemPropertyDescriptors.add(this.createItemPropertyDescriptor(((ComposeableAdapterFactory) this.adapterFactory).getRootAdapterFactory(), this.getResourceLocator(),
                this.getString("_UI_LaneDescription_domainType_feature"), this.getString("_UI_PropertyDescriptor_description", "_UI_LaneDescription_domainType_feature", "_UI_LaneDescription_type"),
                DeckPackage.Literals.LANE_DESCRIPTION__DOMAIN_TYPE, true, false, false, ItemPropertyDescriptor.GENERIC_VALUE_IMAGE, null, null));
    }

    /**
     * This adds a property descriptor for the Is Collapsible Expression feature. <!-- begin-user-doc --> <!--
     * end-user-doc -->
     *
     * @generated
     */
    protected void addIsCollapsibleExpressionPropertyDescriptor(Object object) {
        this.itemPropertyDescriptors.add(this.createItemPropertyDescriptor(((ComposeableAdapterFactory) this.adapterFactory).getRootAdapterFactory(), this.getResourceLocator(),
                this.getString("_UI_LaneDescription_isCollapsibleExpression_feature"),
                this.getString("_UI_PropertyDescriptor_description", "_UI_LaneDescription_isCollapsibleExpression_feature", "_UI_LaneDescription_type"),
                DeckPackage.Literals.LANE_DESCRIPTION__IS_COLLAPSIBLE_EXPRESSION, true, false, false, ItemPropertyDescriptor.GENERIC_VALUE_IMAGE, null, null));
    }

    /**
     * This specifies how to implement {@link #getChildren} and is used to deduce an appropriate feature for an
     * {@link org.eclipse.emf.edit.command.AddCommand}, {@link org.eclipse.emf.edit.command.RemoveCommand} or
     * {@link org.eclipse.emf.edit.command.MoveCommand} in {@link #createCommand}. <!-- begin-user-doc --> <!--
     * end-user-doc -->
     *
     * @generated
     */
    @Override
    public Collection<? extends EStructuralFeature> getChildrenFeatures(Object object) {
        if (this.childrenFeatures == null) {
            super.getChildrenFeatures(object);
            this.childrenFeatures.add(DeckPackage.Literals.LANE_DESCRIPTION__OWNED_CARD_DESCRIPTIONS);
            this.childrenFeatures.add(DeckPackage.Literals.LANE_DESCRIPTION__EDIT_TOOL);
            this.childrenFeatures.add(DeckPackage.Literals.LANE_DESCRIPTION__CREATE_TOOL);
            this.childrenFeatures.add(DeckPackage.Literals.LANE_DESCRIPTION__CARD_DROP_TOOL);
        }
        return this.childrenFeatures;
    }

    /**
     * <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @generated
     */
    @Override
    protected EStructuralFeature getChildFeature(Object object, Object child) {
        // Check the type of the specified child object and return the proper feature to use for
        // adding (see {@link AddCommand}) it as a child.

        return super.getChildFeature(object, child);
    }

    /**
     * This returns LaneDescription.svg. <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @generated NOT
     */
    @Override
    public Object getImage(Object object) {
        return this.overlayImage(object, this.getResourceLocator().getImage("full/obj16/LaneDescription.svg"));
    }

    /**
     * <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @generated
     */
    @Override
    protected boolean shouldComposeCreationImage() {
        return true;
    }

    /**
     * This returns the label text for the adapted class. <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @generated
     */
    @Override
    public String getText(Object object) {
        String label = ((LaneDescription) object).getName();
        return label == null || label.length() == 0 ? this.getString("_UI_LaneDescription_type") : this.getString("_UI_LaneDescription_type") + " " + label;
    }

    /**
     * This handles model notifications by calling {@link #updateChildren} to update any cached children and by creating
     * a viewer notification, which it passes to {@link #fireNotifyChanged}. <!-- begin-user-doc --> <!-- end-user-doc
     * -->
     *
     * @generated
     */
    @Override
    public void notifyChanged(Notification notification) {
        this.updateChildren(notification);

        switch (notification.getFeatureID(LaneDescription.class)) {
            case DeckPackage.LANE_DESCRIPTION__NAME:
            case DeckPackage.LANE_DESCRIPTION__DOMAIN_TYPE:
            case DeckPackage.LANE_DESCRIPTION__IS_COLLAPSIBLE_EXPRESSION:
                this.fireNotifyChanged(new ViewerNotification(notification, notification.getNotifier(), false, true));
                return;
            case DeckPackage.LANE_DESCRIPTION__OWNED_CARD_DESCRIPTIONS:
            case DeckPackage.LANE_DESCRIPTION__EDIT_TOOL:
            case DeckPackage.LANE_DESCRIPTION__CREATE_TOOL:
            case DeckPackage.LANE_DESCRIPTION__CARD_DROP_TOOL:
                this.fireNotifyChanged(new ViewerNotification(notification, notification.getNotifier(), true, false));
                return;
        }
        super.notifyChanged(notification);
    }

    /**
     * This adds {@link org.eclipse.emf.edit.command.CommandParameter}s describing the children that can be created
     * under this object. <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @generated NOT
     */
    @Override
    protected void collectNewChildDescriptors(Collection<Object> newChildDescriptors, Object object) {
        newChildDescriptors.add(this.createChildParameter(DeckPackage.Literals.LANE_DESCRIPTION__OWNED_CARD_DESCRIPTIONS, DeckFactory.eINSTANCE.createCardDescription()));

        newChildDescriptors.add(this.createChildParameter(DeckPackage.Literals.LANE_DESCRIPTION__EDIT_TOOL, DeckFactory.eINSTANCE.createEditLaneTool()));

        newChildDescriptors.add(this.createChildParameter(DeckPackage.Literals.LANE_DESCRIPTION__CREATE_TOOL, DeckFactory.eINSTANCE.createCreateCardTool()));

        newChildDescriptors.add(this.createChildParameter(DeckPackage.Literals.LANE_DESCRIPTION__CARD_DROP_TOOL, DeckFactory.eINSTANCE.createCardDropTool()));

        super.collectNewChildDescriptors(newChildDescriptors, object);
    }

    /**
     * This returns the label text for {@link org.eclipse.emf.edit.command.CreateChildCommand}. <!-- begin-user-doc -->
     * <!-- end-user-doc -->
     *
     * @generated NOT
     */
    @Override
    public String getCreateChildText(Object owner, Object feature, Object child, Collection<?> selection) {
        return super.getCreateChildText(owner, feature, child, selection);
    }

}
