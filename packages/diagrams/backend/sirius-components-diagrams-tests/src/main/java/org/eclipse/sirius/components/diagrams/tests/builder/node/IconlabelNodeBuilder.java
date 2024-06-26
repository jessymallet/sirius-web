/*******************************************************************************
 * Copyright (c) 2022, 2024 Obeo.
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
package org.eclipse.sirius.components.diagrams.tests.builder.node;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.eclipse.sirius.components.diagrams.CollapsingState;
import org.eclipse.sirius.components.diagrams.CustomizableProperties;
import org.eclipse.sirius.components.diagrams.INodeStyle;
import org.eclipse.sirius.components.diagrams.IconLabelNodeStyle;
import org.eclipse.sirius.components.diagrams.InsideLabel;
import org.eclipse.sirius.components.diagrams.Node;
import org.eclipse.sirius.components.diagrams.NodeType;
import org.eclipse.sirius.components.diagrams.Position;
import org.eclipse.sirius.components.diagrams.Size;
import org.eclipse.sirius.components.diagrams.ViewModifier;
import org.eclipse.sirius.components.diagrams.components.LabelType;
import org.eclipse.sirius.components.diagrams.tests.builder.TestLayoutDiagramBuilder;
import org.eclipse.sirius.components.diagrams.tests.builder.label.LabelBuilder;

/**
 * Used to build list item nodes.
 *
 * @param <T>
 *            The parent builder type
 *
 * @author sbegaudeau
 */
@SuppressWarnings("checkstyle:HiddenField")
public class IconlabelNodeBuilder<T> implements NodeBuilder<T> {

    private final NodesBuilder<T> nodesBuilder;

    private final boolean isBorderNode;

    private final InsideLabel insideLabel;

    private Position position;

    private Size size;

    private NodesBuilder<IconlabelNodeBuilder<T>> borderNodesBuilder;

    private NodesBuilder<IconlabelNodeBuilder<T>> childNodesBuilder;

    private Set<CustomizableProperties> customizedProperties = Set.of();

    public IconlabelNodeBuilder(NodesBuilder<T> nodesBuilder, String nodeLabel, boolean isBorderNode) {
        this.insideLabel = new LabelBuilder().basicInsideLabel(nodeLabel, LabelType.INSIDE_CENTER, false);
        this.isBorderNode = isBorderNode;
        this.nodesBuilder = Objects.requireNonNull(nodesBuilder);
    }

    public IconlabelNodeBuilder<T> at(double x, double y) {
        this.position = Position.at(x, y);
        return this;
    }

    public IconlabelNodeBuilder<T> of(double width, double height) {
        this.size = Size.of(width, height);
        return this;
    }

    public NodesBuilder<IconlabelNodeBuilder<T>> borderNodes() {
        this.borderNodesBuilder = new NodesBuilder<>(this, true);
        return this.borderNodesBuilder;
    }

    public NodesBuilder<IconlabelNodeBuilder<T>> childNodes() {
        this.childNodesBuilder = new NodesBuilder<>(this, false);
        return this.childNodesBuilder;
    }

    public IconlabelNodeBuilder<T> customizedProperties(Set<CustomizableProperties> customizedProperties) {
        this.customizedProperties = Objects.requireNonNull(customizedProperties);
        return this;
    }

    public NodesBuilder<T> and() {
        return this.nodesBuilder;
    }

    @Override
    public Node build(Map<String, String> targetObjectIdToNodeId) {
        List<Node> borderNodes = Optional.ofNullable(this.borderNodesBuilder).map(nodesBuilder -> nodesBuilder.build(targetObjectIdToNodeId)).orElse(List.of());
        List<Node> childNodes = Optional.ofNullable(this.childNodesBuilder).map(nodesBuilder -> nodesBuilder.build(targetObjectIdToNodeId)).orElse(List.of());

        INodeStyle style = IconLabelNodeStyle.newIconLabelNodeStyle()
                .background("white")
                .build();

        String labelText = this.insideLabel.getText();
        String nodeId = UUID.randomUUID().toString();
        targetObjectIdToNodeId.put(labelText, nodeId);

        String descriptionId = TestLayoutDiagramBuilder.NODE_DESCRIPTION_ID;
        if (this.nodesBuilder.and() instanceof NodeBuilder) {
            descriptionId = TestLayoutDiagramBuilder.CHILD_NODE_DESCRIPTION_ID;
        }

        return Node.newNode(nodeId)
                .type(NodeType.NODE_ICON_LABEL)
                .insideLabel(this.insideLabel)
                .position(Objects.requireNonNull(this.position))
                .size(Objects.requireNonNull(this.size))
                .borderNode(this.isBorderNode)
                .borderNodes(borderNodes)
                .childNodes(childNodes)
                .customizedProperties(this.customizedProperties)
                .descriptionId(descriptionId)
                .targetObjectId(labelText)
                .targetObjectKind("")
                .targetObjectLabel(labelText)
                .style(Objects.requireNonNull(style))
                .modifiers(Set.of())
                .state(ViewModifier.Normal)
                .collapsingState(CollapsingState.EXPANDED)
                .build();
    }

}
