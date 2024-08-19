# Copyright (c) HashiCorp, Inc.
# SPDX-License-Identifier: MPL-2.0

output "cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = module.eks.cluster_endpoint
}

output "cluster_security_group_id" {
  description = "Security group ids attached to the cluster control plane"
  value       = module.eks.cluster_security_group_id
}

output "region" {
  description = "AWS region"
  value       = var.region
}

output "cluster_name" {
  description = "Kubernetes Cluster Name"
  value       = module.eks.cluster_name
}

# output "node_group_names" {
#   value = module.eks.eks_managed_node_groups["one"]["node_group_id"]
# }

output "node_group_names" {
  value = {
    for key, node_group in module.eks.eks_managed_node_groups :
    key => replace(node_group.node_group_id, "${local.cluster_name}:", "")
  }
}

# output "eks_module_attributes" {
#   value = module.eks
# }

output "cluster_oidc_issuer" {
  value = "https://oidc.eks.${var.region}.amazonaws.com/id/${module.eks.cluster_oidc_issuer_url}"
}
