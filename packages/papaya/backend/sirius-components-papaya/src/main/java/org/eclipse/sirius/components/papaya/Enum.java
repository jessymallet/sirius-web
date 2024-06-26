/*******************************************************************************
 * Copyright (c) 2024 Obeo.
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
package org.eclipse.sirius.components.papaya;

import org.eclipse.emf.common.util.EList;

/**
 * <!-- begin-user-doc --> A representation of the model object '<em><b>Enum</b></em>'. <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 * <li>{@link org.eclipse.sirius.components.papaya.Enum#getLiterals <em>Literals</em>}</li>
 * </ul>
 *
 * @see org.eclipse.sirius.components.papaya.PapayaPackage#getEnum()
 * @model
 * @generated
 */
public interface Enum extends Type {
    /**
     * Returns the value of the '<em><b>Literals</b></em>' containment reference list. The list contents are of type
     * {@link org.eclipse.sirius.components.papaya.EnumLiteral}. <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @return the value of the '<em>Literals</em>' containment reference list.
     * @see org.eclipse.sirius.components.papaya.PapayaPackage#getEnum_Literals()
     * @model containment="true"
     * @generated
     */
    EList<EnumLiteral> getLiterals();

} // Enum
